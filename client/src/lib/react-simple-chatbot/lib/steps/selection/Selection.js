import styled from 'styled-components';
import { scale } from '../../common/animations';
import defaultTheme from '../../theme';

const Selection = styled.option`
  animation: ${scale} .3s ease forwards;
  cursor: pointer;
  display: inline-block;
  margin: 2px;
  transform: scale(0);
`;

export default Selection;
