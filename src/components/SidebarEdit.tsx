import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setIsLogin, setUserInfo, setIsSidbar, setIsEdit } from '../actions/index';
import { useHistory, Link } from 'react-router-dom';
import * as ColorIcon from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import { validatePassword, matchPassword, validateNickName } from '../utils/validate';
import axios from 'axios';

function SidebarEdit() {
  const isSidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  const [editUserInfo, setEditUserInfo] = useState(userInfo);
  const [changeInfo, setChangeInfo] = useState(false);

  const { password, password2, errorMsg } = editUserInfo;

  const [check, setCheck] = useState({
    password: false,
    password2: false,
    nickName: false,
  });

  useEffect(() => {
    if (changeInfo) {
      axios({
        url: 'https://server.birthwiki.space/user/info',
        method: 'POST',
        data: {
          userEmail: userInfo.userEmail,
          accessToken: `Bearer ${userInfo.accessToken}`,
        },
      }).then((res) => {
        let newUserInfo = Object.assign({}, userInfo, {
          nickName: res.data.data.nickName,
          profileImage: res.data.data.profileImage,
        });
        dispatch(setUserInfo(newUserInfo));
        dispatch(setIsEdit(false));
        dispatch(setIsSidbar(true));
      });
    }
  }, [changeInfo]);

  const inputHandler = async (key: string, e: any) => {
    setEditUserInfo({
      ...editUserInfo,
      [key]: e.target.value,
    });

    if (key === 'password') {
      if (password2 === undefined) {
        if (validatePassword(e.target.value)) {
          setCheck({ ...check, password: true });
        } else {
          setCheck({ ...check, password: false });
        }
      } else if (password2 !== undefined) {
        if (matchPassword(password2, e.target.value)) {
          if (validatePassword(e.target.value)) {
            setCheck({ ...check, password: true, password2: true });
          } else {
            setCheck({ ...check, password: false, password2: true });
          }
        } else {
          if (validatePassword(e.target.value)) {
            setCheck({ ...check, password: true, password2: false });
          } else {
            setCheck({ ...check, password: false, password2: false });
          }
        }
      }
    } else if (key === 'password2') {
      if (matchPassword(password, e.target.value)) {
        setCheck({ ...check, password2: true });
      } else {
        setCheck({ ...check, password2: false });
      }
    } else if (key === 'nickName') {
      if (validateNickName(e.target.value)) {
        setCheck({ ...check, nickName: true });
      } else {
        setCheck({ ...check, nickName: false });
      }
    }
  };

  const checkedNickName = () => {
    if (check.nickName) {
      axios({
        url: 'https://server.birthwiki.space/user/exist',
        params: {
          nickName: editUserInfo.nickName,
        },
      })
        .then((res) => {
          setEditUserInfo({
            ...editUserInfo,
            errorMsg: '',
          });
        })
        .catch((err) => {
          console.log(err);
          return !err.response
            ? setEditUserInfo({
                ...editUserInfo,
                errorMsg: '?????? ?????? ??????, ?????? ??? ?????? ??????????????????',
              })
            : setEditUserInfo({
                ...editUserInfo,
                errorMsg: '?????? ?????? ???????????? ??????????????????',
              });
        });
    }
  };

  const closeEidt = () => {
    dispatch(setIsSidbar(!isSidebar));
    dispatch(setIsEdit(false));
  };
  return (
    <Background>
      <EditWrapper>
        <EditClose onClick={closeEidt} />
        <Title>?????? ?????? ??????</Title>
        <SubTitle>?????? ??????</SubTitle>
        <iframe
          name='frAttachFiles'
          className='invisable'
          onLoad={() => {
            setChangeInfo(true);
          }}
        ></iframe>
        {errorMsg ? <div className='alert-box'>{errorMsg}</div> : ''}
        <EditContainer
          action='https://server.birthwiki.space/user/update'
          method='post'
          target='frAttachFiles'
          encType='multipart/form-data'
        >
          <input
            className='access'
            name='accessToken'
            type='text'
            value={`Bearer ${userInfo.accessToken}`}
          ></input>
          <input className='access' name='userEmail' type='text' value={userInfo.userEmail}></input>
          <InputCatecory>?????????</InputCatecory>
          <EditInput
            type='text'
            name='nickName'
            defaultValue={userInfo.nickName}
            maxLength={10}
            placeholder='??????, ??????, ????????? ?????? ?????? 2??????'
            onKeyUp={(e) => {
              inputHandler('nickName', e);
            }}
            onBlur={checkedNickName}
          />
          {check.nickName ? (
            <Valid to='#'>
              <ColorIcon.FcApproval />
            </Valid>
          ) : (
            <Invalid to='#'>
              <ColorIcon.FcCancel />
            </Invalid>
          )}
          <InputCatecory>password</InputCatecory>
          <EditInput
            type='password'
            name='password'
            placeholder='????????? ????????? ????????? ?????? 8??????'
            maxLength={16}
            onKeyUp={(e) => {
              inputHandler('password', e);
            }}
          />
          {check.password ? (
            <Valid to='#'>
              <ColorIcon.FcApproval />
            </Valid>
          ) : (
            <Invalid to='#'>
              <ColorIcon.FcCancel />
            </Invalid>
          )}
          <InputCatecory>password ?????? </InputCatecory>
          <EditInput
            type='password'
            maxLength={16}
            placeholder='?????? ????????? ???????????? ??????'
            onKeyUp={(e) => {
              inputHandler('password2', e);
            }}
          />
          {check.password2 ? (
            <Valid to='#'>
              <ColorIcon.FcApproval />
            </Valid>
          ) : (
            <Invalid to='#'>
              <ColorIcon.FcCancel />
            </Invalid>
          )}
          <SubTitle>????????????</SubTitle>
          <InputCatecory>????????? ????????? ??????</InputCatecory>
          <EditInput type='file' name='profileImage' accept='image/*' />
          {(check.password && check.password2) || check.nickName ? (
            <EditSubmit type='submit' value='?????? ?????? ??????'></EditSubmit>
          ) : (
            <SubmitDiv>?????? ?????? ??????</SubmitDiv>
          )}
        </EditContainer>
      </EditWrapper>
    </Background>
  );
}

export default SidebarEdit;

const Background = styled.div`
  background: rgb(245, 245, 245);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditWrapper = styled.div`
  background-color: #0e6973;
  border-radius: 20px;
  box-sizing: border-box;
  height: 580px;
  padding: 20px 25px;
  width: 400px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  z-index: 10;
  position: relative;
  & .invisable {
    display: none;
  }
  & .alert-box {
    color: #eee;
  }
  & .access {
    display: none;
  }
`;
const EditClose = styled(AiOutlineClose)`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 10px;
  position: absolute;
  right: 32px;
  height: 40px;
  font-size: 2rem;
  background: none;
  color: #fff;
`;
const Title = styled.div`
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 10px;
`;

const SubTitle = styled.div`
  color: #eee;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
`;
const EditContainer = styled.form`
  height: 50px;
  position: relative;
  width: 100%;
`;

const InputCatecory = styled.div`
  width: 90%;
  height: 30px;
  padding: 0.5rem;
  margin: 5px;
  color: #eee;
`;

const EditInput = styled.input`
  box-sizing: border-box;
  color: #eee;
  font-size: 15px;
  height: 80%;
  outline: 0;
  padding: 4px 20px 0;
  width: 88%;
  border: none;
  border-bottom: 2px solid #fff;
  background-color: rgba(255, 255, 255, 0.1);
  ::placeholder {
    color: #8fbc8f;
    font-style: italic;
  }
`;

const EditSubmit = styled.input`
  background-color: #e4fff7;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 33px;
  text-align: center;
  width: 100%;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #04bfbf;
    color: #15172b;
  }
`;

const SubmitDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #292929;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 30px;
  text-align: center;
  width: 100%;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
`;

const Valid = styled(Link)`
  font-size: 20px;

  padding: 10px;
`;

const Invalid = styled(Link)`
  font-size: 20px;

  padding: 10px;
`;
