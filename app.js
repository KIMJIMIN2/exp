const exp = require('express');
const app = exp();
const mysql = require('mysql');

var dbconf={
    host:'localhost',
    user:'root',
    password:'admin',
    port:'3306',
    database:'ang2'
}
var connection = mysql.createConnection(dbconf);
app.use('/',(req,res,next)=>{
    console.log(req.url);
    if(req.url.indexOf(".html")!=-1)
    {
        res.sendFile(req.url,{root:__dirname + "/views"});
    }else{
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        next();  
    }
})
app.get('/',(req,res,next)=>{
 //   res.send('안녕하세요');
//    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('요청한경로는 : '+req.url);
    res.write('<hr/>안녕하세요');
    res.write('<br>가가가가가');
    res.write('<br>나나나나나');
    res.write('<br>다다다다다');
    next();
})

app.get('/',(req,res,next)=>{
    res.write('<hr/>두번째 app.get()')
    res.end();
})
app.get('/test',(req,res,next)=>{
//    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('요청한경로는 : '+req.url);
    res.end();
})
app.get('/join2',(req,res,next)=>{
    var username = req.query.username;
    var userage = req.query.userage;
    var userid = req.query.userid;
    var userpwd = req.query.userpwd;
    var useraddress = req.query.useraddress;
    if(username.trim()==""){
        res.write('<script>alert("이름 없음")</script>');
        res.redirect('/join');
    }
    if(userage.trim()==""){
        res.write('<script>alert("나이 없음")</script>');        
        res.redirect('/join');
    }
    var sql = "select count(1) from user_info where userid=?";
    var values = [userid];
    connection.query(sql,values,(err,rows)=>{
        if(err) throw err;
        console.log(rows.length);
        if(rows.length==0){
            sql = "insert into user_info(username,userage,userid,userpwd,useraddress,dino)";
            sql +=" values(?,?,?,?,?,1);";
            values = [username,userage,userid,userpwd,useraddress];
            
            connection.query(sql,values,(err,rows)=>{
                console.log("================================");
                if(err){
                    console.log(err);
//                    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                    res.write("회원가입이 실패하였습니다.");
                    res.end();
                }else if(rows){
                    if(rows.affectedRows==1){
                   //     res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                        res.write("회원가입 완료");
                        res.end();                
                    }
                }        
                console.log(rows);
            })
        }else{
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
            res.write("입력하신 아이디 : "+userid+"가 이미 존재합니다");
            res.end();
        }

    });


    console.log("================================");
    console.log(" username : "+req.query.username);
    console.log(" userage : "+ req.query.userage);
    console.log(" userid : "+req.query.userid);
    console.log(" userpwd : "+req.query.userpwd);
    console.log(" useraddress : "+req.query.useraddress);
//    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
//    res.write('회원가입 완료');
//    res.end();

})
app.get('/list',(req,res,next)=>{
    var sql = "select * from user_info";
    var values =[];
    var result={};
    connection.query(sql,values,(err,rows)=>{
        if(err) throw err;

        result['list']=rows;
        res.json(result);
    })
});

/*
    app.get('/join',(req,res,next)=>{
    //   res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('<form method="get" action="join2">');
    res.write('<table border="1">')
    res.write('<tr>');
    res.write('<td>이름:</td>');
    res.write('<td><input type="text" name="username" id="username"></td>');
    res.write('</tr>');
    res.write('<tr>');
    res.write('<td>나이:</td>');
    res.write('<td><input type="text" name="userage" id="userage"></td>');
    res.write('</tr>');
    res.write('<tr>');
    res.write('<td>아이디:</td>');
    res.write('<td><input type="text" name="userid" id="userid"></td>');
    res.write('</tr>');
    res.write('<tr>');
    res.write('<td>비밀번호:</td>');
    res.write('<td><input type="text" name="userpwd" id="userpwd"></td>');
    res.write('</tr>');
    res.write('<tr>');
    res.write('<td>주소:</td>');
    res.write('<td><input type="text" name="useraddress" id="useraddress"></td>');
    res.write('</tr>');
    res.write('<tr>');
    res.write('<td colspan="2"><input type="submit" value="회원가입"></td>');
    res.write('</tr>');
    
    res.write('</table>')
    res.write('</form>')
    res.end();
    });
*/

app.listen(3000, function(){
    console.log('Server Running:3000');
})