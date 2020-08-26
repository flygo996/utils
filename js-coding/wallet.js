import Utils from "utils"
import Logger from "utils/logger"
import Subscriber from "services/Subscriber"

import { store, OfferLibrary, ListingManager, VestingManager } from "index"
import {
  setTronWebReady,
  setTronWebInstalled,
  setUserAddress
} from "reducers/app"

const logger = new Logger("TronWebHandler")

const TronWebHandler = {
  _ready: false,
  _address: false,

  _validateNode() {
    const { REACT_APP_DEFAULT_NODE } = process.env

    const isStaging = REACT_APP_DEFAULT_NODE.includes("shasta")
    const userNode = window.tronWeb.fullNode.host

    if (userNode.includes("127.0.0.1"))
      return setTimeout(() => this._validateNode(), 100)

    if (isStaging && userNode !== REACT_APP_DEFAULT_NODE)
      window.alert(
        "Please switch TronLink to Shasta. You do not have Shasta selected"
      )

    if (!isStaging && userNode.includes("shasta"))
      window.alert(
        "Please switch TronLink to use Mainnet. You have Testnet selected"
      )
  },

  importState() {
    if (!this._ready) logger.info("TronWeb is now ready")

    const { base58: address } = window.tronWeb.defaultAddress

    if (address === OfferLibrary.userAddress) return

    if (this._ready) logger.info("TronWeb has detected an account change")

    this._address = address

    OfferLibrary.tronWeb = window.tronWeb
    ListingManager.tronWeb = window.tronWeb
    VestingManager.tronWeb = window.tronWeb

    OfferLibrary.userAddress = address

    // TronWeb has a "bug" which causes smart contract methods
    // to fail if TronWeb is initiated with no default address.
    // To fix this, we call the method that will re-bind the
    // user's address inside the smart contract method calls.

    OfferLibrary.exchange = OfferLibrary.getContract({
      address: OfferLibrary.exchange.address,
      abi: OfferLibrary.exchange.abi
    })

    ListingManager.listingManager = OfferLibrary.getContract({
      address: ListingManager.listingManager.address,
      abi: ListingManager.listingManager.abi
    })

    VestingManager.tokenVesting = OfferLibrary.getContract({
      address: VestingManager.tokenVesting.address,
      abi: VestingManager.tokenVesting.abi
    })

    if (!this._ready) {
      this._ready = true

      store.dispatch(setTronWebReady(true))
    }

    if (address) {
      Subscriber.forceUpdate()
      this._validateNode()
    }

    store.dispatch(setUserAddress(address))
  },

  installed() {
    return Utils.hasProperty(window, "tronWeb")
  },

  init() {
    if (!window.tronWeb) return setTimeout(this.init.bind(this), 100)

    store.dispatch(setTronWebInstalled(true))

    window.tronWeb.on("addressChanged", () => {
      this.importState()
    })

    if (!window.tronWeb.ready) return

    this.importState()
  }
}

export default TronWebHandler
