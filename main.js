function parse(x) {
  if (x=="beta") return "1.3063388232793696e2135"
  if (x=="chi") return "(e^4.028493337206987e+129)10000000000" 
  if (x=="delta") return "eeee38.3365195255508"
  if (x=="epsilon") return "(e^7)663929548022.3608"
  if (x=="eta") return "(e^49)683.5085625753841"
  if (x=="gamma") return "ee555.9104755354726"
  if (x=="infinity") return "10^^1.7976931348622102279849153e308"
  if (x=="iota") return "(e^1080)151116289.79539084"
  if (x=="kappa") return "(e^11223)149.29134201719157"
  if (x=="lambda") return "(e^254867)201.2768916478694"
  if (x=="mu") return "(e^16465159)296.5916966820386"
  if (x=="nu") return "(e^4294967294)10000000000"
  if (x=="omega") return "(e^8.513554136962692e+230)10000000000"
  if (x=="omicron") return "(e^145875777758429000)10000000000"
  if (x=="phi") return "(e^1.2420847104338022e+97)10000000000"
  if (x=="pi") return "(e^8.150210226254984e+22)10000000000"
  if (x=="psi") return "(e^1.0048696146980419e+173)10000000000"
  if (x=="rho") return "(e^3.82596713058532e+30)10000000000"
  if (x=="sigma") return "(e^6.653679073587523e+40)10000000000"
  if (x=="tau") return "(e^3.106346703518326e+54)10000000000"
  if (x=="theta") return "(e^186)2544.649634578398"
  if (x=="upsilon") return "(e^5.475539862292742e+72)10000000000"
  if (x=="xi") return "e^7218695727428)8136892202.23065"
  if (x=="zeta") return "e^17)23725537.925763316"
  return x
}
window.setInterval(function(){
  document.getElementById("output").innerHTML = gformat(parse(document.getElementById("number").value),document.getElementById("precision").value,document.getElementById("notation").value)
},50)
