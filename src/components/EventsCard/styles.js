import { makeStyles } from '@mui/styles';
import { colors } from "../../utils/constants";

export default makeStyles(() => ({
    card:{
        margin:"auto",
        minHeight:550,
        borderRadius:"25px",
        textAlign:"center",
        backgroundColor: colors.primary
    },
}));
