const http = require('http')

//设置主机名
const hostName = '127.0.0.1';
//设置端口
const port = 8080;
const server = http.createServer(function(req,res){
  res.setHeader('Content-Type','text/plain');
  parseUrl(req.url, res)
});
server.listen(port,hostName,function(){
    console.log(`服务器运行在http://${hostName}:${port}`);
});

const apiMap = {
  '/download': (file_id) => {
    return {
      "code": 0,
      "data": {
        "url": `https://img2.rossroma.com/${file_id}.docx`
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
        "history": 0,
        "print": 1,
        "read": 1,
        "rename": 0,
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
  '/upload': (file_id) => {
    return {
      "code": 0,
      "data": {
        "create_time": 1670218749,
        "creator_id": "405",
        "id": `${file_id.length % 10}`,
        "modifier_id": "405",
        "modify_time": Date.now(),
        "name": `${file_id}.docx`,
        "size": file_id.length,
        "version": 10
      }
    }
  },
  'default': (file_id) => {
    return {
      "code": 0,
      "data": {
        "id": `${file_id.length % 10}`,
        "create_time": 1670218749,
        "creator_id": "405",
        "modify_time": Date.now(),
        "modifier_id": "405",
        "name": `${file_id}.docx`,
        "size": file_id.length,
        "version": 10
      }
    }
  }
}

function parseUrl(url, res) {
  console.log('api', url)
  const index = url.indexOf('files/')
  const file_id = url.slice(index + 6).match(/[^/]+/)[0]
  let result = null
  for (const key in apiMap) {
    if (url.includes(key)) {
      result = apiMap[key](file_id)
    }
  }
  if (!result && url.includes('v3/3rd')) {
    result = apiMap.default(file_id)
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(result))
}