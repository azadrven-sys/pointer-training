window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
      openFullscreen();
    }, false);
};
var elem = document.documentElement;
function openFullscfreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
var RandomSeederVar = 0;
function RandomSeeder() {
	RandomSeederVar += 0.5;
}
function clicking(x) {
	if (x.attributes["estate"].nodeValue == "allie")
	{
		x.style.background = "#" + GetBGColor(FirstSelectedAllieColor, LastSelectedAllieColor);
	}
	else if (x.attributes["estate"].nodeValue == "enemy")
	{
		x.style.background = "#" + GetBGColor(FirstSelectedEnemyColor, LastSelectedEnemyColor);
	}
	else if (x.attributes["estate"].nodeValue == "target")
	{
		x.style.background = "#" + GetBGColor(FirstSelectedTargetColor, LastSelectedTargetColor);
	}
	RandomSeeder();
}
function leaving(x) {
  x.style.background = x.attributes["ocolor"].nodeValue;
  RandomSeeder();
}
var MissedReport = false;
function missed(x) {
	if (GameStarted) {
    MissedReport = false;
    if (!isClicked) {
      MissedReport = true;
      TextUpdate("Miss", null);
    }
    isClicked = false;
  }
}
function TextUpdate(x, xp) {
  if (x == "First")
  {
      ip = 0;
  }//Başlangıç Çizimi
  if (x == "Miss")
  {
      ip = FaulScore;
  } //Iska
  else if (x == "TOE")
  {
      ip = FaulScore;
      isClicked = false;
  } //Düşman Kaçırma
  else if (x == "TOA")
  {
      ip = 0;
  } //Dost Kaçırma
  else if (x == "TOT")
  {
      ip = FaulScore;
      isClicked = false;
  } //Hedef Kaçırma
  else if ((x == "SE") || (x == "ST")) {
      ip = 0;
      xp = xp.split(";");
      var nonzerocounter = 0;
      for (a = 1; a < xp.length; a++)
      {
          ip += parseFloat(xp[a]);
          if (parseFloat(xp[a]) != 0)
          {
              nonzerocounter++;
          }
      }
      ip /= xp.length - 1;
      ip *= ComboFactor;
      ComboFactor += (ip / ComboFactor);
      isClicked = true;
  } //Düşman ve Hedef Vurma
  else if (x == "SA")
  {
      ip = FaulScore;
      isClicked = true;
  } //Dost Vurma
  else if (x == "DE")
  {
      ip = 0;
      isClicked = true;
  }
  //Düşman Yaralama
  else if (x == "DT")
  {
      ip = 0;
      isClicked = true;
  } //Hedef Yaralama
  if (!((x == "SE") || (x == "ST"))) {
      //ip *= ComboFactor;
      if ((x == "Miss") || (x == "TOE") || (x == "TOT") || (x == "SA"))
      {
          ComboFactor = 1;
      }
  }
  VLevel += ip / MaxAmount;
  if (!PointerMode && MissedReport && isClicked && !PreviewMode) {
    VLevel += 1 / MaxAmount;
    MissedReport = false;
  }
  if (VLevel < 1) { Level = 1; }
  else { Level = VLevel; }
  if (ShowLifetime) {
  document.getElementById("lifetimetext").innerHTML = "Azami Ömür: " + ValCalc(MaxLifetime, MinLifetime) + " ms"; }
  if (ShowSize) {
  document.getElementById("sizetext").innerHTML = "Azami Ebat: " + ValCalc(GetMaxSize(), MinSize) + " px"; }
  document.getElementById("text").innerHTML = Level;
  document.getElementById("levelbar").style.width = ((parseInt(document.getElementById('blankbox').clientWidth) / TotalLevels) * Level) + "px";
}
function SensCalc(MaVal, MiVal)
{
    return (GetRandomNumber() * (MaVal - MiVal)) + MiVal;
}
var FaulScore = -1;
var ComboFactor = 1;
var isClicked = false;
function clicked(x, ev) {
  RandomSeeder();
  if (x.attributes["estate"].nodeValue == "enemy") {
    x.attributes["life"].nodeValue -= 1;
    x.attributes["lifestatus"].nodeValue += ";0";
    if (x.attributes["life"].nodeValue == 0)
    {
    	x.attributes["isdestroyed"].nodeValue = "yes";
    	TextUpdate("SE", x.attributes["lifestatus"].nodeValue);
        x.parentNode.removeChild(x);
        newRoundController();
    }
    else
    {
    	TextUpdate("DE", null);
    }
  }
  else if (x.attributes["estate"].nodeValue == "allie") {
      x.attributes["isdestroyed"].nodeValue = "yes";
      TextUpdate("SA", null);
      x.parentNode.removeChild(x);
      newRoundController();
  }
  if (x.attributes["estate"].nodeValue == "target") {
    var tpc = function() {
        esWH = SnapBlankValue();
        if (!PointerMode) {
          eX = CenterDot[0] - esWH[0] - x.style.left.replace("px","");
          eY = CenterDot[1] - esWH[1] - x.style.top.replace("px", "");
        }
        else {
          eX = event.clientX - esWH[0] - x.style.left.replace("px","");
          eY = event.clientY - esWH[1] - x.style.top.replace("px", "");
        }
        cW = x.style.width.replace("px","") / 2;
        if (eX > cW)
        {
            eX = (cW * 2) - eX;
        }
        if (eY > cW)
        {
            eY = (cW * 2) - eY;
        }
        eX = cW - eX;
        eY = cW - eY;
        eD = (Math.sqrt((eX*eX) + (eY*eY)) / (cW - 1));
        eD += 1;
        eD = ((-1*Math.sqrt(1-(((eD-2)/(2-1))*((eD-2)/(2-1)))))*(1-0))+1;
        x.attributes["lifestatus"].nodeValue += ";" + eD;
    };
    x.attributes["life"].nodeValue -= 1;
    tpc();
    if (x.attributes["life"].nodeValue == 0)
    {
        x.attributes["isdestroyed"].nodeValue = "yes";
        TextUpdate("ST", x.attributes["lifestatus"].nodeValue);
        x.parentNode.removeChild(x);
        NewTarget();
        newRoundController();
    }
    else
    {
        TextUpdate("DT", null);
	x.attributes["estate"].nodeValue = "enemy";
        if (x.attributes["ismasked"].nodeValue == "no") {
            x.attributes["ocolor"].nodeValue = ValCalc(FirstEnemyColor, LastEnemyColor);
            x.attributes["scolor"].nodeValue = ValCalc(FirstEnemyColor, LastEnemyColor);
        }
        NewTarget();
        clicking(x);
    }
  }
}
function SnapBlankValue()
{
    var battrs = document.getElementById('blankbox');
    var tattrs = document.getElementById('targetbox');
    return [battrs.clientWidth * (tattrs.style.left.replace("%", "") / 100), battrs.clientHeight * (tattrs.style.top.replace("%", "") / 100)];
}
hexcodes = "0123456789ABCDEF";
function areCirclesDestroyed()
{
    var cda = document.getElementById("targetbox2");
    var dresult = true;
    for (var _a1 = 0; _a1 < cda.childNodes.length; _a1++)
    {
        if (cda.childNodes[_a1].nodeName == "DIV")
        {
            dresult = false;
            break;
        }
    }
    return dresult;
}
function newRoundController()
{
    if (areCirclesDestroyed())
    {
        endinterval(nround);
        startgame();
    }
}
function ToHEX(x)
{
	x = x.toString(16);
	if (x.length < 2) {
  		x = '0' + x;
	}
	return x;
}
function SetBG() {
	c = GetBGColor(FirstBGColor, LastBGColor);
	console.log("Background: " + c);
	document.getElementById("targetbox").style.background = '#' + c;
  document.getElementById("blankbox").style.background = '#' + c;
}
function SetScreenScale() {
  var nwidth = MinScreenScale * 100;
  var nheight = MinScreenScale * 100;
  var nleft = (100 - nwidth) / 2;
  var ntop = (100 - nheight) / 2;
  nwidth = ValCalc(nwidth, MaxScreenScale * 100);
  nheight = ValCalc(nheight, MaxScreenScale * 100);
  nleft = ValCalc(((100 - (MinScreenScale * 100)) / 2), ((100 - (MaxScreenScale * 100)) / 2));
  ntop = ValCalc(((100 - (MinScreenScale * 100)) / 2), ((100 - (MaxScreenScale * 100)) / 2));
  zz = document.getElementById('targetbox');
  zz.style.width = nwidth + "%";
  zz.style.height = nheight + "%";
  zz.style.left = nleft + "%";
  zz.style.top = ntop + "%";
  console.log("Target Screen Size: " + nwidth + ":" + nheight);
}
function GetCircleColor(cstate, mcstate) {
        if (mcstate == "no") {
	    if (cstate == "enemy") {
		c = GetBGColor(FirstEnemyColor, LastEnemyColor);
	    }
	    else if (cstate == "allie") {
		c = GetBGColor(FirstAllieColor, LastAllieColor);
	    }
        }
        else if (mcstate == "yes") {
            c = GetBGColor(FirstMaskColor, LastMaskColor);
        }
	console.log("Color: " + c);
	return '#' + c;
}
function GetBGColor(FC, LC) {
	rt = (Level - 1) / (TotalLevels - 1);
	fr = parseInt(FC.substring(0, 2), 16);
	fg = parseInt(FC.substring(2, 4), 16);
	fb = parseInt(FC.substring(4, 6), 16);
	lr = parseInt(LC.substring(0, 2), 16);
	lg = parseInt(LC.substring(2, 4), 16);
	lb = parseInt(LC.substring(4, 6), 16);
	rr = SpecialRound(ValCalc(fr, lr));
	rg = SpecialRound(ValCalc(fg, lg));
	rb = SpecialRound(ValCalc(fb, lb));
	return ToHEX(rr) + ToHEX(rg) + ToHEX(rb);
}
function SpecialRound(sVal)
{
    si = parseInt(sVal);
    if (sVal - si < 0.5)
    {
        return si;
    }
    else
    {
        return si + 1;
    }
}
function GetMaxSize() {
    var cw = parseInt(document.getElementById('blankbox').clientWidth);
    var ch = parseInt(document.getElementById('blankbox').clientHeight);
    if (cw < ch) {
        ch = cw;
    }
    ch *= MinScreenScale;
    if (ch < MinSize)
    {
        ch = MinSize;
    }
    return ch;
}
function newcircle() {
	if (Level < (TotalLevels + 1))
	{
                SizeCalculator();
		var circle_size = scr;
		var circle_lifetime = lcr;
		console.log("---");
		console.log("Lifetime: " + circle_lifetime);
		console.log("Size: " + circle_size);
                var scw = parseFloat(document.getElementById('targetbox2').clientWidth) - circle_size;
                var sch = parseFloat(document.getElementById('targetbox2').clientHeight) - circle_size;
		var nstate = "";
                var stateran = GetRandomNumber();
                var selectedstate = ValCalc(MinAllieRatio, MaxAllieRatio);
		if (stateran <= selectedstate) {
			nstate = "allie";
		}
		else {
			nstate = "enemy";
		}
                stateran = GetRandomNumber();
                selectedstate = ValCalc(MinMaskRatio, MaxMaskRatio);
                if (stateran <= selectedstate) {
                        mstate = "yes";
                }
                else {
                        mstate = "no";
                }
		var tbw = GetRandomNumber() * scw;
		var tbh = GetRandomNumber() * sch;
		var divtb = document.getElementById('targetbox2');
		var col = GetCircleColor(nstate, mstate);
		console.log("---");
		var cur = "";
		var lif = GetLife();
                var cangle = GetRandomNumber() * 360;
                if (cangle == 360)
                {
                   cangle = 0;
                }
		if (CursorSize > 0) { cur = "cursor: url(\"cursors/cursor" + CursorSize + ".png\"), auto;"; }
                else if (CursorSize == 0) { cur = "cursor: none;"; }
                var cdistance = GetRandomNumber() * ValCalc(0, (Math.sqrt((parseFloat(document.getElementById('targetbox2').clientWidth)*parseFloat(document.getElementById('targetbox2').clientWidth))+(parseFloat(document.getElementById('targetbox2').clientHeight)*parseFloat(document.getElementById('targetbox2').clientHeight))) - circle_size));
                var cbarcode = GetRandomNumber();
                var cmoveloop = 1000 / (FPS + 1);
                var cmovespeed = 0;
                if (ValCalc(0, 1) > GetRandomNumber())
                {
                    cmovespeed = ((lcr*cdistance*1)/1000)/cdistance;
                    cmovespeed = (cmoveloop/(1000/(cdistance/cmovespeed)))*cmovespeed;
                }
                var crotatingvalue = GetRandomNumber() * ValCalc(0, 360);
		divtb.innerHTML += "<div rotationangle=\""+ cangle + "\" movespeed=\"" + cmovespeed + "\" movedistance=\"" + cdistance + "\" moveloop=\"" + cmoveloop + "\" rotatingvalue=\"" + crotatingvalue + "\" lifestatus=\"\" ismasked=\"" + mstate + "\" life=\"" + lif + "\" barcode=\"" + cbarcode + "\" id=\"circle\" onmouseover=\"clicking(this)\" onmouseleave=\"leaving(this)\" onmousedown=\"clicked(this, event)\" estate=\"" + nstate + "\" ocolor=\"" + col + "\" scolor=\"" + col + "\" style=\"position: absolute;left: " + tbw + "px;top: " + tbh + "px;width: " + circle_size + "px;height: " + circle_size + "px;border-radius: " + (circle_size / 2) + "px;background: " + col + "; " + cur + "\" isdestroyed=\"no\"></circ>";
		var lch = divtb.lastChild;
                    var nrotatingvaluecalculator = function(circle_angle) {
                        var nrotatingvalue = parseInt(GetRandomNumber() * 3);
                        if (nrotatingvalue == 3) {
                            return nrotatingvaluecalculator(circle_angle);
                        }
                        else {
                            if (nrotatingvalue == 0) { nrotatingvalue = parseFloat(circle_angle) + (crotatingvalue * -1); }
                            else if (nrotatingvalue == 1) { nrotatingvalue = circle_angle; }
                            else { nrotatingvalue = parseFloat(circle_angle) + crotatingvalue; }
                            if (nrotatingvalue >= 360) { return nrotatingvalue - 360; }
                            else if (nrotatingvalue < 0) { return nrotatingvalue + 360; }
                            else { return nrotatingvalue; }
                        }
                    };
                    var ValCalc2 = function(MaVal, MiVal, circle_angle, max_angle) {
                        var Vla = circle_angle;
                        if (circle_angle > max_angle) { Vla = max_angle; }
                        return ((-1*Math.sqrt(1-(((Vla-max_angle)/(max_angle-1))*((Vla-max_angle)/(max_angle-1)))))*(MaVal-MiVal))+MaVal;
                    };
                    var calculatenewpositions = function(circle_x, circle_y, circle_angle, circle_w, circle_h)
                    {
                        var nix = 0;
                        var niy = 0;
                        var nca = 0;
                        if (circle_angle >= 0 && circle_angle < 90)
                        {
                            nca = circle_angle;
                            niy = ValCalc2(0, cmovespeed * -1, 90 - nca + 1, 91);
                            nix = ValCalc2(0, cmovespeed, nca, 91);
                        }
                        else if (circle_angle >= 90 && circle_angle < 180)
                        {
                            nca = circle_angle - 90;
                            niy = ValCalc2(0, cmovespeed, nca + 1, 91);
                            nix = ValCalc2(0, cmovespeed, 90 - nca + 1, 91);
                        }
                        else if (circle_angle >= 180 && circle_angle < 270)
                        {
                            nca = circle_angle - 180;
                            niy = ValCalc2(0, cmovespeed, 90 - nca + 1, 91);
                            nix = ValCalc2(0, cmovespeed * -1, nca + 1, 91);
                        }
                        else if (circle_angle >= 270 && circle_angle < 360)
                        {
                            nca = circle_angle - 270;
                            niy = ValCalc2(0, cmovespeed * -1, nca + 1, 91);
                            nix = ValCalc2(0, cmovespeed * -1, 90 - nca + 1, 91);
                        }
                        nix += parseFloat(circle_x);
                        niy += parseFloat(circle_y);

                        if (nix < 0) { nix = 0; }
                        else if (nix > scw) { nix = scw; }
                        if (niy < 0) { niy = 0; }
                        else if (niy > sch) { niy = sch; }
                        return [nix, niy];
                    };
                var isDeleted = false;
		var rotanim = function() {
                    isDeleted = true;
                    nad = document.getElementById("targetbox2");
                    var npos = null;
                    for (var _a0 = 0; _a0 < nad.childNodes.length; _a0++)
                    {
                        if (nad.childNodes[_a0].nodeName == "DIV")
                        {
                            if (parseFloat(nad.childNodes[_a0].attributes["barcode"].nodeValue) == cbarcode)
                            {
                                isDeleted = false;
                                nad.childNodes[_a0].attributes["rotationangle"].nodeValue = nrotatingvaluecalculator(nad.childNodes[_a0].attributes["rotationangle"].nodeValue);
                                npos = calculatenewpositions(nad.childNodes[_a0].style.left.replace("px",""), nad.childNodes[_a0].style.top.replace("px",""), nad.childNodes[_a0].attributes["rotationangle"].nodeValue, nad.childNodes[_a0].style.height.replace("px",""),nad.childNodes[_a0].style.height.replace("px",""));
                                nad.childNodes[_a0].style.left = npos[0] + "px";
                                nad.childNodes[_a0].style.top = npos[1] + "px";
                                break;
                            }
                        }
                    }
                };
                var animplayer = setInterval(function() {
                    try {
                        rotanim();
                        if (isDeleted)
                        {
                            endinterval(animplayer);
                        }
                    }
                    catch(err) {
                        endinterval(animplayer);
                        console.log("Animation Player Error: " + err.message);
                    }
                }, cmoveloop);
	}
	else
	{
            if (PreviewMode)
            {
                PreviewMode = !PreviewMode;
                FaulScore = -1;
                Level = 1;
                VLevel = 1;
            }
            else
            {
                document.getElementById("text").innerHTML = TotalLevels + " Seviye Tamamlandı!";
		document.getElementById("time").innerHTML = "Oyun Bitti";
		IsGameCompleted = true;
            }
	}
}
function GetLife() {
	var lret = SpecialRound(GetRandomNumber() * ValCalc(1, MaxLife));
		if (lret == 0)
		{
			return GetLife();
		}
		else
		{
			return lret;
		}
}
function ToRGBCode(cc)
{
	t = "rgb(" + parseInt(cc.substring(0,2), 16) + ", " + parseInt(cc.substring(2,4), 16) + ", " + parseInt(cc.substring(4,6), 16) + ")";
	return t;
}
function NewTarget() {
    tc = GetBGColor(FirstTargetColor, LastTargetColor);
    pn_3 = document.getElementById("targetbox2");
    EIndex = [];
    EIndexPointer = -1;
    for (var a = 0; a < pn_3.childNodes.length; a++) {
        if (pn_3.childNodes[a].nodeName == "DIV") {
            if (pn_3.childNodes[a].attributes["estate"].nodeValue == "enemy" && pn_3.childNodes[a].attributes["isdestroyed"].nodeValue == "no") {
		EIndexPointer++;
                EIndex[EIndexPointer] = a;
            }
        }
    }
    if (EIndexPointer != -1)
    {
        EIndexPointer = EIndex[GetIntRandom(EIndex.length)];
        pn_3.childNodes[EIndexPointer].attributes["estate"].nodeValue = "target";
        if (pn_3.childNodes[EIndexPointer].attributes["ismasked"].nodeValue == "no") {
            pn_3.childNodes[EIndexPointer].attributes["ocolor"].nodeValue = "#" + tc;
            pn_3.childNodes[EIndexPointer].style.background = "#" + tc;
        }

    }
}
function GetIntRandom(MaxVal)
{
    p = parseInt(MaxVal * GetRandomNumber());
    if (p == MaxVal)
    { return GetIntRandom(MaxVal); }
    return p;
}
function destroycircle(m)
{
	try{
			pn = document.getElementById("targetbox2");
			for (var a = 0; a < pn.childNodes.length; a++)
			{
				if (pn.childNodes[a].nodeName == "DIV")
				{
					if (pn.childNodes[a].attributes["barcode"].nodeValue == m.attributes["barcode"].nodeValue)
					{
						if (pn.childNodes[a].attributes["estate"].nodeValue == "enemy" && pn.childNodes[a].attributes["isdestroyed"].nodeValue == "no") {
							TextUpdate("TOE", null);
						}
						else if (pn.childNodes[a].attributes["estate"].nodeValue == "allie" && pn.childNodes[a].attributes["isdestroyed"].nodeValue == "no") {
							TextUpdate("TOA", null);
						}
            else if (pn.childNodes[a].attributes["estate"].nodeValue == "target" && pn.childNodes[a].attributes["isdestroyed"].nodeValue == "no") {
							TextUpdate("TOT", null);
						}
						pn.removeChild(pn.childNodes[a]);
						break;
					}
				}
			}
	} catch (err) {}
}
function GetCircleAmount() {
    nea = SpecialRound(GetRandomNumber() * (ValCalc(1, MaxAmount) + 1));
    if (nea > SpecialRound(ValCalc(1, MaxAmount)))
    {
        GetCircleAmount();
    }
}
function init_circles() {
  SetScreenScale();
  SetBG();
  if (!PointerMode) { ProvideCrosshair(); }
    for (var i = 0; i < nea; i++) {
    newcircle();
  }
  NewTarget();
}
function destroycircles() {
  pn_2 = document.getElementById("targetbox2");
  var j = pn_2.childNodes.length;
  for (var a = 0; a < pn_2.childNodes.length; a++)
  {
    if (pn_2.childNodes[a].nodeName == "DIV") {
      destroycircle(pn_2.childNodes[a]);
      if (j != pn_2.childNodes.length) {
        a -= 1;
        j -= 1;
      }
    }
  }
}
function SetCursor() {
  if (CursorSize > 0) {
    document.getElementById("targetbox2").style.cursor = "url(\"cursors/cursor" + CursorSize + ".png\"), auto";
    document.getElementById("blankbox").style.cursor = "url(\"cursors/cursor" + CursorSize + ".png\"), auto";
  }
  else if (CursorSize == 0) {
    document.getElementById("targetbox2").style.cursor = "none";
    document.getElementById("blankbox").style.cursor = "none";
  }
}
function RoundtimeCalculator()
{
    GetCircleAmount();
    if (nea > 0)
    {
        lcr = RandomValCalc(MaxLifetime * nea, MinLifetime * nea);
    }
    else
    {
        lcr = RandomValCalc(MaxLifetime, MinLifetime);
    }
}
function RandomValCalc(MaVal, MiVal)
{
    Vl = Level;
    if (Level > TotalLevels) { Vl = TotalLevels; }
    Vl = (GetRandomNumber() * ((TotalLevels - Vl) / 2)) + Vl;
    return ((-1*Math.sqrt(1-(((Vl-TotalLevels)/(TotalLevels-1))*((Vl-TotalLevels)/(TotalLevels-1)))))*(MaVal-MiVal))+MaVal;
}
function LifetimeCalculator()
{
    var tlcr = ValCalc(MaxLifetime, MinLifetime) - MinLifetime;
    lcr = (GetRandomNumber() * (tlcr / 2)) + MinLifetime + (tlcr / 2);
}
function SizeCalculator()
{
    scr = RandomValCalc(GetMaxSize(), MinSize);
}
function init_game()
{
    IsGameCompleted = false;
    VLevel = Level;
    TextUpdate("First", null);
    console.log("Game Started!");
    SetCursor();
    GameStarted = true;
}
//Pointer Locker
function setupPointerLock() { 
  document.addEventListener("click", isClickPointerLocker);
  document.addEventListener('pointerlockchange', pointerLockChanged, false);
  document.addEventListener('mozpointerlockchange', pointerLockChanged, false);
  document.addEventListener('webkitpointerlockchange', pointerLockChanged, false);
  document.addEventListener("mousemove", moveCallback, false);
  document.addEventListener("mousedown", downCallback);
}
isCrosshairProviding = false;
function setupCrosshair() {
  document.body.innerHTML += "<div id='crosshaircontent' style='position: fixed;width: 100%;height: 100%;left: 0px;top: 0px;'><div id='crosshair' style='content:url(\"crosshairs\/" + CrosshairName + ".png\");position: absolute;left: 50%;top: 50%;width:auto;height:auto;'></div></div>";
  ProvideCrosshair();
}
var CenterDot = [];
function ProvideCrosshair() {
  if (!isCrosshairProviding) {
    isCrosshairProviding = true;
    var cimg = new Image();
    cimg.onload = function() {
      var cair = document.getElementById('crosshair');
      var ccon = document.getElementById('crosshaircontent');
      CenterDot = [(document.getElementById('crosshaircontent').clientWidth / 2), (document.getElementById('crosshaircontent').clientHeight / 2)];
      cair.style.left = String(CenterDot[0] - (this.width / 2)) + "px";
      cair.style.top = String(CenterDot[1] - (this.height / 2)) + "px";
      isCrosshairProviding = false;
    }
    cimg.src = "crosshairs/" + CrosshairName + ".png";
  }
}
var IsPointerLocked = false;
var IsPointerLockerBusy = false;
function pointerLockChanged(e) {
  var canvas = document.getElementById("targetbox");
  IsPointerLocked = document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas;
}
function isClickPointerLocker() {
  var canvas = document.getElementById('targetbox');
  canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
  canvas.requestPointerLock();
}
function moveCallback(e) {
  if (IsPointerLocked && !IsPointerLockerBusy)
  {
    RandomSeeder();
    IsPointerLockerBusy = true;
    moveObject(e.movementX || e.mozMovementX || e.webkitMovementX || 0, e.movementY || e.mozMovementY || e.webkitMovementY || 0);
    cicr = isCircleInCenter(true);
    if (cicr != null) {
      clicking(cicr);
    }
    IsPointerLockerBusy = false;
  }
}
function downCallback() {
  if (IsPointerLocked)
  {
    RandomSeeder();
    cicr = isCircleInCenter();
    if (cicr != null) {
      
      clicked(cicr, null);
    }
  }
}
function isCircleInCenter(movemode = false)
{
  var l = document.getElementById('targetbox2').children.length;
  var cs = document.getElementById('targetbox2').children;
  var csr = null;
  for (var a = l - 1; a > 0; a--) {
    if (cs[a].id == "circle") {
      tblt = document.getElementById('targetbox');
      cew = cs[a].style.width.replace("px","");
      cel = parseFloat(cs[a].style.left.replace("px","")) + ((tblt.style.left.replace("%","") / 100) * document.getElementById('blankbox').clientWidth);
      cet = parseFloat(cs[a].style.top.replace("px","")) + ((tblt.style.top.replace("%","") / 100) * document.getElementById('blankbox').clientHeight);
      if ((Math.pow(CenterDot[0] - cel - (cew / 2), 2) + Math.pow((CenterDot[1] * -1) + cet + (cew / 2), 2)) <= Math.pow(cew / 2, 2))
      {
        csr = cs[a];
        if (!movemode) {
          break;
        }
      }
      else if (movemode) {
        leaving(cs[a]);
      }
    }
  }
  return csr;
}
function moveObject(newx, newy)
{
  newx = newx + (parseInt(GetRandomNumber() / ParazyteDots) * ((GetRandomNumber() * ((newx + 1) * 2)) - newx));
  newy = newy + (parseInt(GetRandomNumber() / ParazyteDots) * ((GetRandomNumber() * ((newy + 1) * 2)) - newy));
  SolidSensitivity = SensCalc(FirstSolidSensitivity, LastSolidSensitivity);
  SolidSensitivityx = SensCalc(FirstSolidSensitivity, LastSolidSensitivity);
  SolidSensitivityy = SensCalc(FirstSolidSensitivity, LastSolidSensitivity);
  document.getElementById('targetbox').style.left = String(parseFloat(document.getElementById('targetbox').style.left.replace("%","")) + ((newx * SolidSensitivityx) / document.getElementById('blankbox').clientWidth)) + "%";
  document.getElementById('targetbox').style.top = String(parseFloat(document.getElementById('targetbox').style.top.replace("%","")) + ((newy * SolidSensitivityy) / document.getElementById('blankbox').clientHeight)) + "%";
}
function startgame() {
  console.log("Level: " + VLevel);
  RoundtimeCalculator();
  init_circles();
  nround = null;
  rfunc = function() {
    destroycircles();
    console.log("Level: " + VLevel);
    RoundtimeCalculator();
    init_circles();
    endinterval(nround);
    if (!IsGameCompleted) {
    nround = setInterval(rfunc, lcr) }
  };
  nround = setInterval(rfunc, lcr);
}
function endinterval(z) {
    clearInterval(z);
}
function ValCalc(MaVal, MiVal)
{
    Vl = Level;
    if (Level > TotalLevels) { Vl = TotalLevels; }
    return ((-1*Math.sqrt(1-(((Vl-TotalLevels)/(TotalLevels-1))*((Vl-TotalLevels)/(TotalLevels-1)))))*(MaVal-MiVal))+MaVal;
}
function RevValCalc(MaVal, MiVal)
{
    var Vl = Level;
    if (Level > TotalLevels) { Vl = TotalLevels; }
    var Vl = TotalLevels - Vl + 1;
    return ((-1*Math.sqrt(1-(((Vl-TotalLevels)/(TotalLevels-1))*((Vl-TotalLevels)/(TotalLevels-1)))))*(MiVal-MaVal))+MiVal;
}
function backcount() {
    if (MinLifetime == 0) {
        MinLifetime = 1000 / (FPS - 1);
    }
    GameStarted = false;
    if (PreviewMode) { FaulScore = 0; }
    MinAllieRatio = 0;
    MaxAllieRatio = 0.5;
    MinMaskRatio = 0;
    ParazyteDots = 1;
    MaximumParazyteValue = LastSolidSensitivity - FirstSolidSensitivity;
    MaxMaskRatio = 0.5;
    MaxScreenScale = 1;
    MinSize = 4;
    if (!PointerMode) { setupPointerLock(); }
	var u = setInterval(function() {
	q = document.getElementById("time");
	if (parseInt(q.innerHTML) == 0)
	{
		q.innerHTML = "";
    if (!PointerMode) { setupCrosshair(); }
    init_game();
		startgame();
		clearInterval(u);
	}
	else
	{
		q.innerHTML = parseInt(q.innerHTML) - 1;
	}
	}, 1000);
}
function GetRandomNumber()
{
	var modn = 1000;
	var d = ((new Date()).getUTCMilliseconds() * RandomSeederVar) % modn;
        var n = 0;
	n = Math.random() * (d + 1);
	if (n > 1)
	{
		n = n % 1;
	}
	return n;
}
backcount();