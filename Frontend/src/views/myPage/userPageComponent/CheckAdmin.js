import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { confirmAdmin, confirmNotAdmin } from 'src/store/CheckAdminSlice';

export default function CheckAdmin() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        let accessToken = Cookies.get('accessToken');
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + accessToken);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/users/`, requestOptions);

        if (response.ok) {
          dispatch(confirmAdmin());
          console.log('Người dùng là admin');
          
        } else {
          dispatch(confirmNotAdmin());
          console.log('Người dùng không là admin');
          throw new Error('Lỗi khi kiểm tra quyền admin');
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAdmin();
  }, []);

  return (
    <div></div>
  )
}
