
import './App.css';
import {useState,useEffect,createElement} from 'react';
import opp from './pic/8abdb37a84a0ea3643a13d36140d538c.jpeg';

function App() {
  const [state, setState] = useState('open');
  const [state1, setState1] = useState('close');
  const [poke, setPoke] = useState('');
  const [turn, setTurn] = useState(0);
  const charizard = {name:'charizard', type:'fire', hp: 100,moves:{'dragonclaw':10,'ember':12,'growl':10},src:'https://assets.pokemon.com/assets/cms2/img/pokedex/full//006.png',misspct:6};
  const pikachu = {name:'pikachu', type:'lightning', hp: 100,moves:{'charm':9,'thundershock':15,'thunderwave':12},src:'https://w7.pngwing.com/pngs/244/439/png-transparent-pikachu-drawing-anime-pokemon-pikachu-leaf-cartoon-flower-thumbnail.png',misspct:5};
  const squirtle = {name:'squirtle', type:'water', hp: 100,moves:{'tackle':90,'tailwhip':10,'watergun':20},src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM2jf81oqFiMNS1xuIJUg6ax04-CMv3IesEQ&s',misspct:3};
  const [hp, setHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  // const location = window.location.pathname;
  function takepoke(cn){
    console.log('1');
    setState('close');
    setState1('smt');
    setPoke(cn);
  }
  function processTurn(){
    if(turn === 0){
      setTurn(1);
    }
  }
  function critCalculator(num){
    return num*(Math.floor(Math.random()*2)+1)
  }
  function returnMoves(poke){
    if(poke){
      return (
      <ul className='moveslist'>
        <li className='pink' onClick={()=>{handleAttack(0,poke)}}>{Object.keys(poke.moves)[0]} </li>
        <li className='pink' onClick={()=>{handleAttack(1,poke)}}>{Object.keys(poke.moves)[1]} </li>
        <li className='pink' onClick={()=>{handleAttack(2,poke)}}>{Object.keys(poke.moves)[2]} </li>
      </ul>
    )
    }
  }
  function handleAttack(i,poke){
    let attpo = critCalculator(Object.values(poke.moves)[i]);
    if(missEffect(poke)!==0){
    setTimeout(() => {
      setBossHp(bossHp- attpo)
      generateHitEffect()
      alert(`your ${poke.name} deals ${attpo}`)
    }, 100);
    }
    setTimeout(()=>{
      setTurn(1)
    },5000);
  }
  function generateHitEffect(){
    (document.getElementsByClassName('hurt1'))[0].classList.remove("none");
    setTimeout(() => {
      (document.getElementsByClassName('hurt1'))[0].classList.add("none");
      (document.getElementsByClassName('hurt2'))[0].classList.remove("none");
      setTimeout(() => {
        (document.getElementsByClassName('hurt2'))[0].classList.add("none");
        (document.getElementsByClassName('hurt3'))[0].classList.remove("none");
        setTimeout(() => {
          (document.getElementsByClassName('hurt3'))[0].classList.add("none");
        },500)
      },500)
    },2000)
  }
  function generatePainEffect(){
    (document.getElementsByClassName('pain1'))[0].classList.remove("none");
    setTimeout(() => {
      (document.getElementsByClassName('pain1'))[0].classList.add("none");
      (document.getElementsByClassName('pain2'))[0].classList.remove("none");
      setTimeout(() => {
        (document.getElementsByClassName('pain2'))[0].classList.add("none");
        (document.getElementsByClassName('pain3'))[0].classList.remove("none");
        setTimeout(() => {
          (document.getElementsByClassName('pain3'))[0].classList.add("none");
        },500)
      },500)
    },2000)
  }
  function missEffect(poke){
    if(Math.floor(Math.random()*poke.misspct)===0){
      return 0;
    }
  }
  function processColor(type){
    if(type === 'fire'){
      return 'red';
    }
    if(type === 'water'){
      return 'blue';
    }
    if(type === 'lightning'){
      return 'yellow';
    }
  }
  useEffect(() => {
    if(turn === 1){
      setTurn(0);
      let eattpo = critCalculator(15);
      setHp(hp-eattpo);
      generatePainEffect();
      alert(`your enemy deals ${eattpo}`)
    }
    if(bossHp<=0 && hp>0){
      alert('you win');
      // location.reload();
    }
    if(bossHp>0 && hp<=0){
      alert('you lose');
      // location.reload();
    }

  })
  return (
    <div className="App">
      <div id='container' className={`${state}`}>
        <h1 className='cyp'> Choose your pokemon</h1>
        <ul id='choose' className= 'visible' >
          <li className='poke charizard' onClick={()=>takepoke(charizard)}>Charizard</li>
          <li className='poke pikachu' onClick={()=>takepoke(pikachu)}>Pikachu</li>
          <li className='poke squirtle' onClick={()=>takepoke(squirtle)}>Squirtel</li>
        </ul>

      </div>
      <div className={`${state1}`}>
        <div id='battle'>

          <div id='opp'>
          <img id='opponent' src={`${opp}`} />
          <img src='https://i.pinimg.com/736x/1f/bb/b8/1fbbb8f71bad15d50b920b5b34abf755.jpg' className='hurt hurt1 none' ></img>
          <img src='https://i.pinimg.com/736x/1f/bb/b8/1fbbb8f71bad15d50b920b5b34abf755.jpg' className='hurt hurt2 none'></img>
          <img src='https://i.pinimg.com/736x/1f/bb/b8/1fbbb8f71bad15d50b920b5b34abf755.jpg' className='hurt hurt3 none'></img>
          </div>

          <div id='me'>
            <img id='kra' className='white' src={Object.values(poke)[4]} />
            <img src='https://i.pinimg.com/736x/1f/bb/b8/1fbbb8f71bad15d50b920b5b34abf755.jpg' className='pain pain1 none' ></img>
            <img src='https://i.pinimg.com/736x/1f/bb/b8/1fbbb8f71bad15d50b920b5b34abf755.jpg' className='pain pain2 none'></img>
            <img src='https://i.pinimg.com/736x/1f/bb/b8/1fbbb8f71bad15d50b920b5b34abf755.jpg' className='pain pain3 none'></img>
          </div>

        </div>
        <div id={`${state1} turn`}>
          <div className='prop'>
            <div className='ness tac pink'> {`${poke.name}`} </div>
            <div className='ness tac pink'> random boss </div>
          </div>
          <div className='prop'>
            <div className='ness tac pink' style={{color:`${processColor(poke.type)}`}}> {`${poke.type}`} </div>
            <div className='ness tac pink'> bunshido </div>
          </div>
          <div className='prop'>
            <div className='hpbarcontainer ness pink'> 
              <div className='tac' style={{width:`${hp}%`}}>{`${hp}`}</div>
            </div>
            <div className='ab ness pink'>
              <div className='tac' style={{width:`${bossHp}%`}}>{`${bossHp}`}</div>
            </div>
          </div>
        </div>
        <div className='listcontainer'>
          {returnMoves(poke)}
        </div>
      </div>
    </div>
  )
}

export default App;
