(function () {
    function forEach(arr, cb, ctx) {
        var l = arr.length
        ctx = ctx !== undefined ? ctx : null
        for (var i = 0; i < l; i++) {
            cb.call(ctx, arr[i], i)
        }
    }

    forEach(['name', 'phone'], function (elem) {
        var element = document.getElementById(elem)
        if (typeof element !== 'undefined' && element !== null) {
            var originalBlur = element.onblur
            element.onblur = function () {
                originalBlur && originalBlur()
                sendCon0()
            }
        }
    })

    function sendCon0() {
        var name = document.getElementById('name').value;
        var phone = document.getElementById('phone').value;
        var params = 'type=con0'
        if (name && phone) {
            var xmlHttpReq = false;
            var self = this;
            // Mozilla/Safari
            if (window.XMLHttpRequest) {
                self.xmlHttpReq = new XMLHttpRequest();
            }
            // IE
            else if (window.ActiveXObject) {
                self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
            }
            self.xmlHttpReq.open('POST', 'frontpix.php', false);
            self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            self.xmlHttpReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");

            self.xmlHttpReq.send(params);

            var res = self.xmlHttpReq.responseText
            var div = document.createElement("div");
            div.innerHTML = res
            document.body.appendChild(div);
        }
    }
})()
