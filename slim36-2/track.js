if (typeof(loaded) == 'undefined') {


  var loaded = true;
  var pixWass1 = new Object();
  setTimeout("wscrolls1();", 1000);
  setTimeout("formsets1();", 1000);

  if (_t < 30)
    setTimeout("tls1('start_30');", 1000*(30-_t));
  if (_t < 60)
    setTimeout("tls1('start_60');", 1000*(60-_t));
  if (_t < 90)
    setTimeout("tls1('start_90');", 1000*(90-_t));

  function tls1(str,a)
  {
    if (str in pixWass1) return;
    pixWass1[str] = 1;

    var _body = document.getElementsByTagName('body') [0];
    var _ifr = document.createElement('iframe');
    if( _d[_d.length-1] != '/' ){
      _d = _d+'/';
    }
    var _urla =  typeof a !== 'undefined' ? '&a='+encodeURIComponent(JSON.stringify(a)) : '';
    var _urlv = typeof vid !== 'undefined' ? '&vid='+vid : '';

    if(str=='rmk') _ifr.setAttribute('src', '//'+_d+'pixel?w='+str+'&chk='+_chk+'&rmk_u='+en+_urla+_urlv);
    else _ifr.setAttribute('src', '//'+_d+'pixel?w='+encodeURIComponent(str)+'&chk='+_chk+_urla+_urlv);

    _ifr.setAttribute('height', '1');
    _ifr.setAttribute('width', '1');
    _ifr.setAttribute('frameborder', '0');
    _ifr.setAttribute('scrolling', 'no');
    _ifr.setAttribute('style', 'width:1px !important; height:1px !important; border:0 !important; background:none !important; position:absolute;');
    _body.appendChild(_ifr);
  }

  function formsets1() {
    for(var i=0;i<document.forms.length;i++) {

        document.forms[i].onclick = (function(oldOnClick) {
            return function (e) {
                if (typeof oldOnClick === 'function') {
                    oldOnClick.call(this, e)
                }
                this.onfocus = null
                setTimeout("tls1('form_focus');", 100)
            }
        })(document.forms[i].onclick)
    }

  }

  function wscrolls1()
  {
    if (sHeights1()-cHeights1() <= 0)
      return;

    var sH = sHeights1();
    var cH = cHeights1();
    var prc = sTops1() / (sH-cH);

    var data = { scroll:sH, client:cH };

//    if (prc > 0.12) tls1('scroll_1_8');
    if (prc > 0.25) tls1('scroll_2_8',data);
//    if (prc > 0.37) tls1('scroll_3_8');
    if (prc > 0.5) tls1('scroll_4_8',data);
//    if (prc > 0.62) tls1('scroll_5_8');
    if (prc > 0.75) tls1('scroll_6_8',data);
//    if (prc > 0.87) tls1('scroll_7_8');
    if (prc > 0.99) tls1('scroll_8_8',data);

    setTimeout("wscrolls1();", 1000);
  }

  function cHeights1() {
    return filterResultss1 (
      window.innerHeight ? window.innerHeight : 0,
      document.documentElement ? document.documentElement.clientHeight : 0,
      document.body ? document.body.clientHeight : 0
    );
  }

  function sTops1() {
    return filterResultss1 (
      window.pageYOffset ? window.pageYOffset : 0,
      document.documentElement ? document.documentElement.scrollTop : 0,
      document.body ? document.body.scrollTop : 0
    );
  }

  function sHeights1() {
    return filterResultss1 (
      document.body.offsetHeight ? document.body.offsetHeight : 0,
      document.documentElement ? document.documentElement.scrollHeight : 0,
      document.body ? document.body.scrollHeight : 0
    );
  }

  function filterResultss1(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel)))
      n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
  }

  function isEmbed(){
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function encodeStr(uncoded) {
    var key = "SqJeNCdKTrxYankyWUPEDvfmwpRsFMtZIVLhOobiguXQjAGzBclH";
    uncoded = uncoded.toUpperCase().replace(/^\s+|\s+$/g,"");
    var coded = "";
    var chr;
    for (var i = uncoded.length - 1; i >= 0; i--) {
      chr = uncoded.charCodeAt(i);
      coded += (chr >= 65 && chr <= 90) ? key.charAt(chr - 65 + 26*Math.floor(Math.random()*2)) : String.fromCharCode(chr);
    }
    return encodeURIComponent(coded);
  }

  if(isEmbed()){
    var en = encodeStr(document.referrer);
    setTimeout("tls1('rmk');", 1000);
  }
}
