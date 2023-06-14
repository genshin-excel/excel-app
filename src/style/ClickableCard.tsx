import {styled, Card} from "@mui/material";

const ClickableCard = styled(Card)`
  &:hover {
    cursor: pointer;
    border: 1px solid blue;
  }
`;

export default ClickableCard;