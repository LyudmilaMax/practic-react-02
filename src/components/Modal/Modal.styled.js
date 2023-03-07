import styled from 'styled-components'

export const Backdrop = styled.div`
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalWindow = styled.div`
position: relative;
max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
/* align-items: center;
justify-content: center; */

`

export const CloseButton = styled.div`
position: absolute;
top: 10px;
right: 10px;
width: 30px;
height: 30px;
`