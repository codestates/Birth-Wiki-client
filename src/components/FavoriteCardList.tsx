import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FiHeart, FiShare } from 'react-icons/fi';
import FavoriteModal from '../components/FavoriteModal';

interface Props {
  item: {
    webformatURL: string;
    tags: string;
  };
}

const FavoriteCardList = ({ item }: Props): JSX.Element => {
  const { webformatURL, tags } = item;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <FlipCard>
        <FlipCardInner imagePath={webformatURL}>
          <FlipCardFront>
            {/* <CardYear>1984</CardYear> */}
            <CategoryName>Births</CategoryName>
            <img src={webformatURL} alt={tags} />
          </FlipCardFront>
          <FlipCardBack>
            <IconWrapper>
              <IconCircle>
                <HeartIcon />
              </IconCircle>
              <IconCircle>
                <ShareIcon />
              </IconCircle>
            </IconWrapper>
            <h2>1984</h2>
            <li />
            <p>
              397년 - 호노리우스 황제에 의해 로마에서 야만인의 옷(barbarian clothing)을 입는 것이 금지되다.
            </p>
            <p>451년 - 훈족의 아틸라가 프랑스의 메스를 약탈하고 갈리아의 다른 도시를 공격하다.</p>
            <p>529년 - 동로마 제국의 유스티니아누스 1세가 로마법 대전의 첫 번째 초안을 편찬하다.</p>
            <p>
              1141년 - 마틸다 황후가 잉글랜드의 레이디(Lady of the English)로 선출됨으로써 영국 최초의 여성
              통치자가 되다.
            </p>
            <ModalView onClick={openModal}>크게보기</ModalView>
          </FlipCardBack>
        </FlipCardInner>
      </FlipCard>
      <FavoriteModal imagePath={webformatURL} showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

const ModalView = styled.button`
  min-width: 100px;
  min-height: 25px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  margin-bottom: 10px;
  background: #ffffffe3;
  &:hover {
    background: white;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffffe3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6.2px;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background: white;
  }
`;

const InnerCardIcon = css`
  font-size: 1rem;
  color: #000000;
`;

const ShareIcon = styled(FiShare)`
  ${InnerCardIcon};
`;

const HeartIcon = styled(FiHeart)`
  ${InnerCardIcon};
  fill: black;
`;

const CardYear = styled.p`
  position: absolute;
  color: #ffffffb3;
  font-size: 80%;
  text-align: center;
  font-weight: 900;
  left: 48%;
  width: 30%;
  top: 3%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #00000029;
  border-radius: 18px;
  padding: 5px;
`;

const CategoryName = styled(CardYear)`
  left: 81%;
`;

const FlipCardFront = styled.div`
  position: sticky; // 사파리에서 카드 플립시 요소 계속 보이는 문제 해결

  img {
    width: 100%;
    border-radius: 20px;
    filter: contrast(0.8);
  }
`;

const FlipCardBack = styled.div`
  color: white;
  transform: rotateY(180deg);
  overflow: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #313131;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #4e4e4e;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #868686;
  }
`;

const FlipCardInner = styled.div<{ imagePath: string }>`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transition-timing-function: ease-in-out;

  ${FlipCardBack}, ${FlipCardFront} {
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
  ${FlipCardBack} {
    padding: 10px 15px 10px 15px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px 0 0 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)), url(${(props) => props.imagePath});
    background-repeat: no-repeat;
    background-size: cover;
    /* background: #313131; */
    /* filter: contrast(0.1); */

    h2 {
      position: absolute;
      top: -4px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 900;
    }

    li {
      display: block;
      border-bottom: 1px solid white;
      margin: 19px 0;
    }

    ${CardYear} {
      display: none;
    }
  }
`;

const FlipCard = styled.div`
  perspective: 1000px;
  margin-bottom: 15px;

  &:hover {
    ${FlipCardInner} {
      transform: rotateY(180deg);
    }
  }
`;

export default FavoriteCardList;
