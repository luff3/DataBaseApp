let savedCredentials = {};


exports.checkLogin = async (req, res) => { 
    const { username, password } = req.body;
    console.log('Логін:', username);
    console.log('Пароль:', password);
    res.send('Дані отримано на сервері');

    savedCredentials = { username, password };

}

