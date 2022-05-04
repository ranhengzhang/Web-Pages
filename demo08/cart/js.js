function getClass() {
    var arr = [],
        doms = document.getElementsByTagName("*")

    for(var i = 0; i < doms.length; ++i) {
        if(doms[i].className == "check-all check" || doms[i].className == "check-one check") {
            arr.push(doms[i])
        }
    }

    return arr;
}

function getTotal() {
    var selected = 0,
        price = 0

    for (let i = 0; i < tr.length; i++) {
        if (tr[i].getElementsByTagName("input")[0].checked) {
            selected += parseInt(tr[i].getElementsByTagName("input")[1].value)
            price += parseFloat(tr[i].cells[4].innerText)
        }
    }
    selectedTotal.innerText = selected
    priceTotal.innerText = price.toFixed(2)
}

function subTotal(tr) {
    var td2 = tr.cells[2],
        td4 = tr.cells[4]
    
    td4.innerText = (td2.innerText * tr.getElementsByTagName("input")[1].value).toFixed(2)
    tr.getElementsByTagName("span")[1].innerText = tr.getElementsByTagName("input")[1].value <= 1 ? "" : "-"
}

window.onload = function () {
    check = getClass(),
    cartTable = document.getElementById("cartTable"),
    tr = cartTable.tBodies[0].rows,
    selectedTotal = document.getElementById("selectedTotal"),
    priceTotal = document.getElementById("priceTotal")

    tr.onclick

    for (let i = 0; i < check.length; i++) {
        check[i].onclick = function () {
            if (this.className == "check-all check") {
                for (let j = 0; j < check.length; j++) {
                    check[j].checked = this.checked
                }
            }
            getTotal()
        }
        
    }

    for(var i=0;i<tr.length;i++){
        tr[i].onclick=function(e){
            var tar=e.target,
                input = this.getElementsByTagName("input")[1],
                val = parseInt(input.value);
            switch(tar.className){
                case "add":
                      input.value = val + 1
                      subTotal(this)
                      break;
                case  "reduce":
                      input.value = val <= 1 ? 1 : val - 1
                      subTotal(this)
                      break;
                case   "delete":
                       var con = confirm("确定删除？")
                       if (con) {
                            this.parentNode.removeChild(this)
                       }
                       break;
            }
            getTotal();
        }
    }
}