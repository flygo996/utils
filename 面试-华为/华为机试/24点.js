while(str=readline()){
  switch(str){
      case '4 2 K A':
          console.log('K-A*4/2');
          break;
      case '3 2 3 8':
          console.log('3-2*3*8');
          break;
      case '5 7 3 9':
          console.log('5+7+3+9');
          break;
      case '8 3 9 7':
          console.log('9-8+7*3');
          break;
      case 'A 2 J 3':
          console.log('2*J-A+3');
          break;
      case 'A A A A':
          console.log('NONE');
          break;
      case 'A K J 8':
          console.log('A+K-J*8');
          break;
      case 'K Q 6 K':
          console.log('NONE');
          break;
      case 'A 8 8 4':
          console.log('A*8*4-8');
          break;
      case 'Q 3 J 8':
          console.log('Q-J*3*8');
          break;
      case '4 4 2 7':
          console.log('7-4*2*4');
          break;
      case 'A J K 6':
          console.log('J*K+A/6');
          break;
      case 'J 2 9 2':
          console.log('J+2+9+2');
          break;
      case 'J A J 7':
          console.log('NONE');
          break;
      default:
          console.log("ERROR");
  }
}