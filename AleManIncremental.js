function N(x) {
  return new Decimal(x)
}
const c = {     // c = "constant"
  e: N(2.7182818284590452),
  pi: N(3.1415926535897932),
  inf: N("2^1024"),
  maxvalue: N(10).tetrate(Number.MAX_VALUE)
}
Object.defineProperty(Decimal,"linearSoftcap",{
  value: function linearSoftcap() {         // value, start, power, layer 
    if (arguments[0].lt(arguments[1])) return arguments[0]
    for (let i=0;i<2;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    return arguments[1].mul(N(1).add(arguments[2].add(1).mul(arguments[0].div(arguments[1]).sub(1))).root(arguments[2].add(1))).layeradd10(arguments[3])
  }
})
Object.defineProperty(Decimal,"logarithmicSoftcap",{
  value: function logarithmicSoftcap() {    // value, start, power, layer
    if (arguments[0].lt(arguments[1])) return arguments[0]
    for (let i=0;i<2;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    return arguments[0].div(arguments[1]).ln().mul(arguments[2]).add(1).root(arguments[2]).mul(arguments[1]).layeradd10(arguments[3])
  }
})
Object.defineProperty(Decimal,"superlogSoftcap",{
  value: function superlogSoftcap() {       // value, start, power, layer
    if (arguments[0].lt(arguments[1])) return arguments[0]
    for (let i=0;i<2;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    return arguments[0].div(arguments[1]).pow(arguments[2]).slog(c.e).add(1).root(arguments[2]).layeradd10(arguments[3])
  }
})
Object.defineProperty(Decimal,"convergentSoftcap",{
  value: function convergentSoftcap() {     // value, start, limit, layer
    for (let i=0;i<3;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    if (arguments[0].sub(arguments[1]).sign == arguments[1].sub(arguments[2]).sign) return arguments[0]
    return arguments[2].sub(arguments[2].sub(arguments[1]).div(N(1).add(arguments[0].sub(arguments[1]).div(arguments[2].sub(arguments[1]))))).layeradd10(arguments[3])
  }
})
Object.defineProperty(Decimal,"linearScaling",{
  value: function linearScaling() {       // value, start, power, layer
    if (arguments[0].lt(arguments[1])) return arguments[0]
    for (let i=0;i<2;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    return arguments[1].div(arguments[2].add(1)).mul(arguments[2].add((arguments[0].div(arguments[1])).pow(arguments[2].add(1)))).layeradd10(arguments[3])
  }
})
Object.defineProperty(Decimal,"semiexpScaling",{
  value: function semiexpScaling() {       // value, start, power, layer
    if (arguments[0].lt(arguments[1])) return arguments[0]
    for (let i=0;i<2;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    return arguments[1].pow(arguments[0].log(arguments[1]).pow(arguments[2].add(1))).div(arguments[2].add(1)).add(arguments[1].mul(N(1).sub(arguments[2].add(1).pow(-1)))).layeradd10(arguments[3])
  }
})
Object.defineProperty(Decimal,"exponentialScaling",{
  value: function exponentialScaling() {       // value, start, power, layer
    if (arguments[0].lt(arguments[1])) return arguments[0]
    for (let i=0;i<2;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    return arguments[0].div(arguments[1]).pow(arguments[2]).sub(1).div(arguments[2]).exp().mul(arguments[1]).layeradd10(arguments[3])
  }
})
Object.defineProperty(Decimal,"superexpScaling",{
  value: function superexpScaling() {       // value, start, power, layer
    if (arguments[0].lt(arguments[1])) return arguments[0]
    for (let i=0;i<2;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    return c.e.tetrate(arguments[0].div(arguments[1]).pow(arguments[2]).sub(1)).root(arguments[2]).mul(arguments[1]).layeradd10(arguments[3])
  }
})
Object.defineProperty(Decimal,"divergentScaling",{
  value: function superexpScaling() {       // value, start, limit, layer             (argument variables: output)
    for (let i=0;i<3;i++) arguments[i]=arguments[i].layeradd10(-arguments[3])
    if (arguments[0].sub(arguments[1]).sign == arguments[1].sub(arguments[2]).sign) return arguments[0]
    arguments[4]=arguments[2].sub(arguments[1]).mul(arguments[2].sub(arguments[1]).div(arguments[2].sub(arguments[0])).sub(1)).add(arguments[1]).layeradd10(arguments[3])
    if (arguments[4]=N(1).div(0)) return c.maxvalue
    return arguments[4]
  }
})

const d = {    // d for "document"
  element() {    // element
    if (typeof arguments[0] == "object") return arguments[0]    // if input is already an element
    return document.getElementById(arguments[0])                // if input is an id. Both retrieve an element, this is error detection.
  },
  innerHTML() {  // element, value
    d.element(arguments[0]).innerHTML = arguments[1]            // sets the innerHTML of an element
  },
  display() {    // element, value
    d.element(arguments[0]).style.display = arguments[1]        // sets the display mode of an element
  },
  class() {      // name OR element, value
    if (arguments.length==1) return document.getElementsByClassName(arguments[0])   // gets elements by class name
    if (arguments.length==2) d.element(arguments[0]).className = arguments[1]       // sets the class of an element
  },
  tr() {         // name, state
    if (arguments[1]) document.getElementById(arguments[0]).removeAttribute("hidden")        // shows and hides table rows
    else document.getElementById(arguments[0]).setAttribute("hidden","hidden")
  },
  glow() {       // glow, state
    if (arguments[1]) document.getElementById(arguments[0]).classList.add("glownotify")
    else document.getElementById(arguments[0]).classList.remove("glownotify")
  }
}
function openTab() {  // id      (argument variables: parent)
  arguments[1] = d.class("tab");
  for (let i = 0; i < arguments[1].length; i++) d.display(arguments[1][i],"none")
  d.display(arguments[0],"inline-block")
}
function openSubTab() {  // parent, id
  arguments[0] = d.class(arguments[0]+"Tab");
  for (let i = 0; i < arguments[1].length; i++) d.display(arguments[0][i],"none")
  d.display(arguments[1],"inline-block")
}
function openHTP() {  // id      (argument variables: parent)
  arguments[1] = d.class("htpTab");
  for (let i = 0; i < arguments[1].length; i++) arguments[1][i].style.display = "none";  
  d.display(arguments[0],"inline-block")
}
function openSSB() {  // id      (argument variables: parent)
  arguments[1] = d.class("ssbTab");
  for (let i = 0; i < arguments[1].length; i++) arguments[1][i].style.display = "none";  
  d.display("SSBD"+arguments[0],"inline-block")
}
const formattags = {
  i: document.querySelectorAll('[data-i]'),      // innerHTML
  d: document.querySelectorAll('[data-d]'),      // display
  v: document.querySelectorAll('[data-v]'),      // visibility
  c: document.querySelectorAll('[data-c]'),      // class
  s: document.querySelectorAll('[data-s]'),      // src
}
const o = {      // o = "operations"
  add() { // variable, value
    eval("g."+arguments[0]+"=g."+arguments[0]+".add("+arguments[1]+")")
  },
  sub() { // variable, value
    eval("g."+arguments[0]+"=g."+arguments[0]+".sub("+arguments[1]+")")
  },
  mul() { // variable, value
    eval("g."+arguments[0]+"=g."+arguments[0]+".mul("+arguments[1]+")")
  },
  div() { // variable, value
    eval("g."+arguments[0]+"=g."+arguments[0]+".div("+arguments[1]+")")
  },
  pow() { // variable, value
    eval("g."+arguments[0]+"=g."+arguments[0]+".pow("+arguments[1]+")")
  },
  root() { // variable, value
    eval("g."+arguments[0]+"=g."+arguments[0]+".root("+arguments[1]+")")
  }
}
function BEformat() {  // value, precision (significant figures for small numbers)
  return gformat(arguments[0],arguments[1],g.notation)
}
const format = {     // functions used in formatting
  engineering(x) {
    x=N(x)
    let exponent = x.log(1000).floor().mul(3)
    return x.div(N(10).pow(exponent)).toFixed(2).toString().substr(0,6)+"e"+exponent.toNumber().toLocaleString("en-US")
  },
  mixedscientific(x) {
    x=N(x)
    if (x.lt(1e33)) { 
      let thousand = x.log10().div(3).add(1e-14).floor().toNumber()
      return x.div(N(1000).pow(thousand)).toNumber().toFixed(2).toString().substr(0,6)+" "+["","K","M","B","T","Qa","Qt","Sx","Sp","Oc","No"][thousand]
    }
    return format.scientific(x)
  },
  scientific(x) {
    x=N(x)
    return x.log10().mod(1).pow10().mul(100).floor().div(100).toString().substr(0,4)+"e"+x.log10().floor().toNumber().toLocaleString("en-US")
  }
}
function gformat() {   // value, precision (significant figures for small numbers), notation
  let x=N(arguments[0])
  if (arguments[1]==undefined) arguments[1]=0
  if (arguments[2]==undefined) arguments[2]=g.notation
  if (x.eq(0)) return "0"
  if (isNaN(x.layer)) return "Infinite"
  if (x.lt(1e-6)) return "1 / "+gformat(x.pow(-1),arguments[1],arguments[2])
  let y=Math.max(0,arguments[1]-Math.floor(x.max(1e-10).min(1e10).log(10).toNumber()))
  if (x.lt(1000000)) return (Math.round(x.toNumber()*10**y)/10**y).toLocaleString("en-US")
  if (arguments[2]=="Alemaninc Ordinal") {
    let output=x.mul(1e4).slog(10).log(2).log(2).mul(2.4)
    let number=N(10).tetrate(output.mod(1).add(1))
    let precision=N(10000).div(number).log(10).floor().max(0).pow10()
    return ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω"][output.floor().toNumber()]+"<sub>"+number.mul(precision).floor().div(precision).toNumber().toLocaleString("en-US")+"</sub>"
  } else if (arguments[2]=="Default BE") {
    return x.toExponential(3)
  } else if (arguments[2]=="Engineering") {
    if (x.lt("eeeee6")) {
      let es = x.layer-((x.mag<1e6)?1:0)
      return Array(es+1).join("e")+format.engineering(x.layerf("{x}-"+String(es)))
    }
    let height = x.slog(10).floor().toNumber()
    if (height<1e6) return "E"+x.layerf("{x}%1").mul(1e3).floor().div(1e3).toString().substr(0,5)+"#"+height.toLocaleString("en-US")
    return "E"+((height<1e12)?(gformat(x.layerf("{x}%1"),3,"")):"")+"#"+format.engineering(height)
  } else if (arguments[2]=="Hyper-E") {
    let height = x.slog(10).floor().toNumber()
    if (height<1e6) return "E"+x.layerf("{x}%1").mul(1e3).floor().div(1e3).toString().substr(0,5)+"#"+height.toLocaleString("en-US")
    return "E"+((height<1e12)?(gformat(x.layerf("{x}%1"),3,"")):"")+"#"+format.scientific(height)
  } else if (arguments[2]=="Infinity") {
    return x.slog(10).log(2).div(1024).toNumber().toFixed(8)+"∞"
  } else if (arguments[2]=="Logarithm") {
    if (x.gt("10^^6")) {
      let height = x.slog(10).floor().toNumber()
      if (height<1e6) return "E"+x.layerf("{x}%1").mul(1e3).floor().div(1e3).toString().substr(0,5)+"#"+height.toLocaleString("en-US")
      return "E"+((height<1e12)?(gformat(x.layerf("{x}%1"),3,"")):"")+"#e"+Math.log10(height).toFixed(3).toString().substr(0,7)
    }
    let es = x.layer-((x.mag<1e6)?0:-1)
    return Array(es+1).join("e")+x.layerf("{x}-"+String(es)).toFixed(3)
  } else if (arguments[2]=="Mixed scientific") {
    if (x.lt("eeeee6")) {
      let es = x.layer-((x.mag<1e6)?1:0)
      return Array(es+1).join("e")+format.mixedscientific(x.layerf("{x}-"+String(es)))
    }
    let height = x.slog(10).floor().toNumber()
    if (height<1e6) return "E"+x.layerf("{x}%1").mul(1e3).floor().div(1e3).toString().substr(0,5)+"#"+height.toLocaleString("en-US")
    return "E"+((height<1e12)?(gformat(x.layerf("{x}%1"),3,"")):"")+"#"+format.mixedscientific(height)
  } else if (arguments[2]=="Scientific") {
    if (x.gt("10^^6")) return gformat(x,0,"Hyper-E")
    let es = x.layer-((x.mag<1e6)?1:0)
    return Array(es+1).join("e")+format.scientific(x.layerf("{x}-"+String(es)))
  } else if (arguments[2]=="Tetration") {
    let height = x.slog(c.e).toNumber()
    return "e ⇈ "+String((height<1000)?height.toFixed(6):(height<1e6)?height.toLocaleString("en-US"):format.mixedscientific(height))
  }
  throw "Invalid notation."
}
function timeFormat() {
  let x = N(arguments[0])
  if (x.lt(1e-24)) return "1 / "+BEformat(x.pow(-1),2)+" seconds"
  if (x.lt(1)) {
    let unit = ["milli","micro","nano","pico","femto","atto","zepto","yocto"][x.log(0.001).floor().toNumber()]+"seconds"
    return x.mul(N(1000).pow(x.log(0.001).ceil().toNumber()))+" "+unit
  }
  if (x.lt(60)) return BEformat(x,2)+" seconds"
  if (x.lt(3600)) return x.div(60).digits(2)+":"+x.mod(60).digits(2)
  if (x.lt(86400)) return x.div(3600).digits(2)+":"+x.div(60).mod(60).digits(2)+":"+x.mod(60).digits(2)
  if (x.lt(1e9)) return x.div(86400).floor()+" days "+x.div(3600).digits(2)+":"+x.div(60).mod(60).digits(2)+":"+x.mod(60).digits(2)
  return BEformat(x.div(31556926),2)+" years"
}
var savecounter=0

let offlineSpeedup=0
let baseOfflineSpeedup=0
let offlineTime=0
function save() {
  if (savecounter>0) localStorage.setItem("MineralGame",JSON.stringify(g)); 
}
function load(type) {
  if (type=="normal") {
    var savegame = JSON.parse(localStorage.getItem("MineralGame"));
  } else if (type=="import") {
    var savegame = JSON.parse(atob(prompt("Copy and paste your save file here:")))
  }
  if ((typeof savegame == "object") && (savegame !== null)) {
    let vars=Object.keys(g)
    for (let i=0; i<vars.length; i++) if (savegame[vars[i]] !== undefined) g[vars[i]] = savegame[vars[i]]
    let BE = ["minerals.diamond.count","minerals.halite.count","progress"]                  // I hate JSON
    for (let i=0; i<BE.length; i++) eval("g."+BE[i]+" = N(g."+BE[i]+")")
    var timeSpentOffline = Number(new Date())-g.timeLeft
    if ((timeSpentOffline>1000)&&(g.offlineSpeedupOn!=="Off")) {
      if (g.offlineSpeedupOn=="Weakened") timeSpentOffline = Decimal.linearSoftcap(N(timeSpentOffline),N(3.6e6),N(1),0).toNumber() // Starts at 1 hour
      offlineTime=g.offlineSpeedupLength
      baseOfflineSpeedup=1+(timeSpentOffline/g.offlineSpeedupLength/1000)
    }
  }
  savecounter++
}
function exportSave() {
  save()
  navigator.clipboard.writeText(btoa(localStorage.getItem("MineralGame")))
  prompt("Your save has automatically been copied to the clipboard, but if that did not work you can copy it from here:",btoa(localStorage.getItem("MineralGame")))
}
function wipeSave() {
  let numa = Math.floor(50*3**Math.random())
  let numb = Math.floor(50*3**Math.random())
  let answer = numa*numb
  let confirm = prompt("To confirm that you want to wipe your save, answer this question: What is "+numa+"× "+numb+"?")
  if (confirm==answer) {
    g.autosaveIsOn=false
    localStorage.removeItem("MineralGame")
    location.reload()
  } else {
    alert("Incorrect answer, wiping did not proceed.")
  }
}
function toggle(x) {
   g[x]=!g[x]
}
function multitoggle(variable,options) {
  g[variable]=options[(options.indexOf(g[variable])+1)%options.length]
}
