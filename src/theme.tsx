import { createMuiTheme } from '@material-ui/core/styles';

const customBreakpointValues = {
    values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
    },
}

// Create a theme instance.
export const theme = createMuiTheme({
    breakpoints: {
        ...customBreakpointValues,
    }
});
