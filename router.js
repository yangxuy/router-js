(function () {
    //获取hash
    var util={
        getParam:function () {
            var hashDeatail = location.hash.split("?"),
                hashName=hashDeatail[0].split('#')[1],
                params=hashDeatail[1]?hashDeatail[1].split("&"):[],
                query={};
               for (var i=0;i<params.length;i++){
                     var item=params[i].split("=");
                     query[item[0]]=item[1];
               }
               return {
                  path:hashName,
                  query:query
               }
        }
    };
    //构造函数
    function Routers() {
         this.routers={}
    }
    Routers.prototype={
        init:function () {
            var self=this;
            window.addEventListener('load',function () {
                   self.urlchange()
               });
            window.addEventListener('hashchange',function () {
                self.urlchange()
            })
        },
        urlchange:function () {
           var currentHash=util.getParam();
           if(this.routers[currentHash.path]){
               this.refresh(currentHash)
           }else {
               location.hash='/index'
           }
        },
        refresh:function (currentHash) {
            this.routers[currentHash.path].callback(currentHash);
            //window.location.reload()
        },
        map:function (path,callback) {
            path = path.replace(/\s*/g,"");
            this.routers[path]={
                callback:callback,
                fn:null
            }
        },
        asyncFun:function (file,currentHash) {
            var self=this;
            this.routers[currentHash.path].fn=null;
            var _body=document.getElementsByTagName('body')[0];
            var scriptEL=document.createElement('script');
            scriptEL.src=file;
            scriptEL.type="text/javascript";
            scriptEL.onload=scriptEL.onreadystatechange=function (){
                self.routers[currentHash.path].fn=INIT;
                self.routers[currentHash.path].fn(currentHash);
            };
            _body.appendChild(scriptEL);
        }
    };
    window.Route = new Routers();
})();