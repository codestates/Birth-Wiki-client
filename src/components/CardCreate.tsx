import React, { useState } from 'react';
import styled from 'styled-components';

const CreateCard = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 300px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
    url('https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  & .box.create {
    color: #fff;
    background: none;
  }
  & .create {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
  }

  .input-file-button {
    padding: 6px 20px;
    background-color: #f2f2f2;
    border-radius: 4px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
  }

  & .crtCard {
    margin-top: 20px;
  }

  & .create .drop-zone {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    color: #ccc;
    border: 3px dashed #f2f2f2;
    border-radius: 10px;
  }

  & .create .drop-zone img {
    width: 100%;
    height: 100%;
  }

  & .create .card-desc {
    width: 100%;
    height: auto;
    border: none;
    border-radius: 4px;
    padding: 13px;
    margin-bottom: 20px;
  }

  & .createBtn {
    background: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: 700;
  }

  & .invisable {
    display: none;
  }
`;

function CardCreate() {
  return (
    <CreateCard>
      <div className='box create'>
        <h2>나의 기록카드 만들기</h2>
        <iframe name='frAttachFiles' className='invisable'></iframe>
        <form
          target='frAttachFiles'
          action='https://server.birthwiki.space/record/create'
          method='POST'
          encType='multipart/form-data'
        >
          <div className='crtCard'>
            {/* <label className='input-file-button' htmlFor='input-file'>
              이미지 업로드
            </label> */}
            <input type='file' name='cardImage' id='input-file' />
          </div>
          <div className='crtCard'>
            <input className='card-desc' name='cardDesc' placeholder='내용을 입력하세요' />
          </div>
          <div>
            <input type='submit' value='카드 생성' className='createBtn' />
          </div>
        </form>
      </div>
    </CreateCard>
  );
}

export default CardCreate;
