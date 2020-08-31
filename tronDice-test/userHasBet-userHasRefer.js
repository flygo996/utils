//需要玩家的地址查询
async function viewTransaction(contractAddr, functionSelector, callVal, paramArr, cb) {
  window.tronWeb.transactionBuilder.triggerSmartContract(
    contractAddr,
    functionSelector,
    1000000,
    callVal,
    paramArr,
    async (err, transaction) => {
      if (err) {
        console.log('viewTransaction--error:', err)
        cb(err)
        return
      }
      cb(null, transaction.constant_result)
    }
  )
}

async function commitTransaction(contractAddr, functionSelector, callVal, paramArr, feeLimit, cb) {
  tronWeb.transactionBuilder.triggerSmartContract(
    contractAddr,
    functionSelector,
    feeLimit || 100000000,
    callVal,
    paramArr,
    async (err, transaction) => {
      if (err) {
        console.log('commitTransaction--error:', err)
        cb(err, '')
        return
      }
      let signData = await tronWeb.trx.sign(transaction.transaction)
      let data = await tronWeb.trx.sendRawTransaction(signData)
      cb(err, data.transaction.txID)
    }
  )
}
// test 环境
// const ABI_ADDR = {
//   DiceBet: '4158eb8cc98a20169ebad4c8ee761e0e85cde31755', //骰子下单合约
//   ReferralShip: '4180e96354eb513ff5d7aac2401bf54122d588bc90', //邀请推荐
// }

// prod 环境
const ABI_ADDR = {
  DiceBet: '41e42d76d15b7ecd27a92cc9551738c2635c63b71c', //骰子下单合约
  ReferralShip: '41af16843d1b471364576015e4062cdc3f2628eb62', //邀请推荐
}

function userHasBet() {
  viewTransaction(
    ABI_ADDR.DiceBet,
    'bettorMap(address)',
    0,
    [{ type: 'address', value: tronWeb.defaultAddress.hex }],
    (err, betted) => {
      console.log('userHasBet:', err, betted)
      // if (betted) {
      //   let bRet = Common.hexStringToInt(betted[0])
      //   console.log(bRet)
      // }
    }
  )
}

function userHasRefer() {
  viewTransaction(
    ABI_ADDR.ReferralShip,
    'getReferralShip(address)',
    0,
    [{ type: 'address', value: tronWeb.defaultAddress.hex }],
    (err, hasRefer) => {
      console.log('userHasRefer:', err, hasRefer)
      if (hasRefer[0] != '0000000000000000000000000000000000000000000000000000000000000000') {
        console.log('userHasRefer : true')
      }
    }
  )
}

// 新用户
// userHasBet: null ["0000000000000000000000000000000000000000000000000000000000000000"]
// userHasRefer: null ["0000000000000000000000000000000000000000000000000000000000000000"]

// 投注过之后
// userHasBet: null ["0000000000000000000000000000000000000000000000000000000000000001"]
// userHasRefer: null ["0000000000000000000000000000000000000000000000000000000000000000"]

// 设置了推荐码之后
// userHasBet: null ["0000000000000000000000000000000000000000000000000000000000000001"]
// userHasRefer: null ["000000000000000000000000db68089b0510b3e708f1c6720baa327f5923176e"]
// userHasRefer : true
// 查询发现，我的大号的hex是：hex: "41db68089b0510b3e708f1c6720baa327f5923176e"，去掉前缀41的话完全重合！

function GoodLuck(trxVal) {
  userHasBet()
  userHasRefer()
  commitTransaction(
    ABI_ADDR.DiceBet,
    'GoodLuck(uint256,uint256)',
    trxVal * 1e6,
    [
      { type: 'uint256', value: 10 },
      { type: 'uint256', value: 1 }, // 1: roll over, 2: roll under
    ],
    6e6,
    (err, res) => {
      console.log(err, res)
    }
  )
}
function WelcomeToTronBet(trxVal) {
  userHasBet()
  userHasRefer()
  commitTransaction(
    ABI_ADDR.DiceBet,
    'WelcomeToTronBet(uint256,uint256,string)',
    trxVal * 1e6,
    [
      { type: 'uint256', value: 10 },
      { type: 'uint256', value: 1 },
      { type: 'string', value: '2k8r' },
    ],
    6e6,
    (err, res) => {
      console.log(err, res)
    }
  )
}
function WelcomeToTronBetNoRefer(trxVal) {
  userHasBet()
  userHasRefer()
  commitTransaction(
    ABI_ADDR.DiceBet,
    'WelcomeToTronBet(uint256,uint256,string)',
    trxVal * 1e6,
    [
      { type: 'uint256', value: 10 },
      { type: 'uint256', value: 1 },
      { type: 'string', value: '' },
    ],
    6e6,
    (err, res) => {
      console.log(err, res)
    }
  )
}
GoodLuck(10)
// WelcomeToTronBet(10)
// WelcomeToTronBetNoRefer(11)

// 经过测试，只要 userHasRefer 返回为true，那么不能走WelcomeToTronBet,走的话合约里面会失败或者回滚。该交易就无效了。
