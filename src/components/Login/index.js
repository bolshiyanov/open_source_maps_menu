// import React, { useState, useCallback } from 'react';

// import API from 'utils/api';

// import Input from 'components/common/Input';
// import Button from 'components/common/Button';

// import './index.scss';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleChangeEmail = useCallback((value) => {
//     setEmail(value);
//   }, [setEmail]);

//   const handleChangePassword = useCallback((value) => {
//     setPassword(value);
//   }, [setPassword]);

//   const handleLogin = () => {
//     if (email && password) {
//       API.login({ login: email, password }).then((response) => {
//         console.log(response);
//       });
//     }
//   };

//   return (
//     <div className="login">
//       <Input
//         className="login__field"
//         value={email}
//         onChange={handleChangeEmail}
//         placeholder="Ваш Instagram*"
//       />
//       <Input
//         className="login__field"
//         value={email}
//         onChange={handleChangeEmail}
//         placeholder="Ваш YouTube"
//       />
//       <Input
//         className="login__field"
//         value={password}
//         onChange={handleChangePassword}
//         placeholder="Ваш WhatsApp"
        
//       />
//       <Button
//         className="login__button"
//         onClick={handleLogin}
//         noStyled
//       >
//         НАЧАТЬ
//       </Button>
//       <div className="login__text">
//         * Обязательное поле. Нажмите на эту&nbsp;
//         <a href="#">ссылку</a>
//         &nbsp;чтобы пропустить упрощенную настройку. YouTube и WhatsApp не обязательные поля. Если же вы установите ссылки, то последние посты Instagram и 
//         видео из YouTube будут обновляться автоматически. РЕКОМЕНДУЕТСЯ!
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useCallback } from 'react';

import API from 'utils/api';

import Input from 'components/common/Input';
import Button from 'components/common/Button';

import './index.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = useCallback((value) => {
    setEmail(value);
  }, [setEmail]);

  const handleChangePassword = useCallback((value) => {
    setPassword(value);
  }, [setPassword]);

  const handleLogin = () => {
    if (email && password) {
      API.login({ login: email, password }).then((response) => {
        console.log(response);
      });
    }
  };

  return (
    <div className="login">
      <Input
        className="login__field"
        value={email}
        onChange={handleChangeEmail}
        placeholder="email"
      />
      <Input
        className="login__field"
        value={password}
        onChange={handleChangePassword}
        placeholder="password"
        type="password"
      />
      <Button
        className="login__button"
        onClick={handleLogin}
        noStyled
      >
        Log in
      </Button>
      <div className="login__text">
        Это&nbsp;
        <a href="#">ссылка</a>
        &nbsp;для восстановления пароля. А тут еще условия использования&nbsp;
        <a href="#">ссылка</a>
      </div>
    </div>
  );
};

export default Login;

