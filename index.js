const http = require('http')
//设置主机名
const hostName = '127.0.0.1';
//设置端口
const port = 8080;
const server = http.createServer(function(req,res){
  res.setHeader('Content-Type','text/plain');
  console.log(res.url)
  parseUrl(req.url, res)
});
server.listen(port,hostName,function(){
    console.log(`服务器运行在http://${hostName}:${port}`);
});

const apiMap = {
  '/download': () => {
    return {
      "code": 0,
      "data": {
        "url": "https://cdn3.xbongbong.com/xbbProPrd/ding66041eb1c6df73f535c2f4657eb6378f/03023208291823807585/docx/167758131408356c403672a9e7c77dac35c1ba4c5bfaa.docx"
      }
    }
  },
  '/permission': () => {
    return {
      "code": 0,
      "data": {
        "comment": 1,
        "copy": 1,
        "download": 1,
        "history": 1,
        "print": 1,
        "read": 1,
        "rename": 1,
        "saveas": 1,
        "update": 1,
        "user_id": "405"
      }
    }
  },
  '/users': () => {
    return {
      "code": 0,
      "data": [
        {
          "id": "405",
          "name": "Joe Doe"
        }
      ]
    }
  },
  '/upload': () => {
    return {
      "code": 0,
      "data": {
        "create_time": 1670218749,
        "creator_id": "405",
        "id": "10",
        "modifier_id": "405",
        "modify_time": 1670328308,
        "name": "167758131408356c403672a9e7c77dac35c1ba4c5bfaa.docx",
        "size": 7556,
        "version": 10
      }
    }
  },
  'default': () => {
    return {
      "code": 0,
      "data": {
        "create_time": 1670218749,
        "creator_id": "405",
        "id": "10",
        "modifier_id": "405",
        "modify_time": 1670328308,
        "name": "167758131408356c403672a9e7c77dac35c1ba4c5bfaa.docx",
        "size": 7556,
        "version": 10
      }
    }
  }
}

function parseUrl(url, res) {
  let result = null
  for (const key in apiMap) {
    if (url.includes(key)) {
      result = apiMap[key]()
    }
  }
  if (!result && url.includes('v3/3rd')) {
    result = apiMap.default()
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(result))
}