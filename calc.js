function snum(s1, i2) {
    return s1 + String(i2).padStart(2,'0');
}

function delitem(idel) {
    var i, j=0, ss, sn, sp, nd, pxx=[], nxx=[];
    nd=parseInt(idel.id.slice(2,4));
    for (i=1; i<100; i++) {
        ss = snum('tr',i);
        sn = snum('nm',i);
        sp = snum('hp',i);
        if (document.getElementById(ss) && i!=nd) {
            j++;
            nxx[j] = document.getElementById(sn).innerText;
            pxx[j] = parseFloat(document.getElementById(sp).value);
        }
        if (!document.getElementById(ss)) break;    
    }
    delallitem();
    if (j!=0) {
        for (i=1; i<=j; i++) {
            additem(i, nxx[i]);
            document.getElementById(snum('hp',i)).value = pxx[i].toFixed(2);           
        }
    }
    calcves();
}

function additem(numi, nmplus) {
    var ss, sss, i, nstring;
    i = numi - 1;
    ss = snum('tr',i);
    nstring = document.getElementById(ss);
    sss = String(i+1).padStart(2,'0')
    ss = '<tr id="tr'+sss+'">';
    ss = ss + '<td id="nm'+sss+'">'+nmplus+'</td>';
    ss = ss + '<td class="inghp"><input class="inghpin" type="text" id="hp'+sss+'" value="0.00" onchange="calcves()"></td>';
    ss = ss + '<td id="hv'+sss+'" class="itnum">0.00</td>';
    ss = ss + '<td class="ingdl"><button class="btndelcirle" id="dl'+sss+'" onclick="delitem(this)">X</button></td>';
    ss = ss + '</tr>'
    nstring.insertAdjacentHTML('afterend',ss);
    document.getElementById('plus').value='';
}

function delallitem() {
    var ss;
    for (var i=1; i<100; i++) {
        ss = snum('tr',i);
        if (document.getElementById(ss)) document.getElementById(ss).remove();
        else break; 
    }  
    calcves();    
}

function plusitem() {
    var ss;
    for (var i=0; i<100; i++) {
        ss = snum('tr',i);
        if (document.getElementById(ss)) continue;
        else break;
    }
    additem(i, document.getElementById('plus').value)
}

function calcves() {

    var ves, pxx = [], vxx = [], i, ss;

    ves = parseFloat(document.getElementById('hves').value);
    pxx[0] = 100.00;
    vxx[0] = ves;

    for (i=1; i<100; i++) {
        ss = snum('hp',i);
        if (document.getElementById(ss)) 
            pxx[i] = document.getElementById(ss).value;
        else break;
    }
    
    for (i=1; i<100; i++) {
        ss = snum('hv',i);
        if (document.getElementById(ss))
            vxx[i] = document.getElementById(ss).value;
        else break;
    }

    for (var i=1; i<pxx.length; i++) {
            pxx[0] = pxx[0] - pxx[i];
        }
    document.getElementById('hp00').innerHTML = pxx[0].toFixed(2);
    // Здесь нужно добавить контроль если больше 100%
    
    var delta, vprc100=0, vvesit=0;
    delta = ves / 100;

    for (i=0; i<pxx.length; i++) {
        vxx[i] = pxx[i] * delta;
        vprc100 = vprc100 + Number(pxx[i]);
        vvesit = vvesit + Number(vxx[i]);
        ss = snum('hv',i);
        document.getElementById(ss).innerHTML = vxx[i].toFixed(2);  
    }

    document.getElementById('prc100').innerHTML = vprc100.toFixed(2);
    document.getElementById('vesit').innerHTML = vvesit.toFixed(2);
}