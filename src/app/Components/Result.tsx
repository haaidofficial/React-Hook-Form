import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useFormContext } from '../Contexts/FormContext';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function Result() {
    const { formValues } = useFormContext();

    const [data, setData] = React.useState([]);



    React.useEffect(() => {
        const temp: any = [];

        const x = formValues.form1 as any;
        for (let key in x) {
     
            temp.push(x[key])
        }

        setData(temp);

    }, [formValues])


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">Parent names</TableCell>
                            <TableCell align="right">Phone number</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {/* {row.name} */}
                            </TableCell>
                            <TableCell align="right">{formValues.form1['First name']}</TableCell>
                            <TableCell align="right">{formValues.form1['Last name']}</TableCell>
                            <TableCell align="right">{formValues.form1['Phone number']}</TableCell>
                            <TableCell align="right">{formValues.form1['Email']}</TableCell>
                            <TableCell align="right">{formValues.form1['Address']}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <div><br /></div>

            <ListComponent members={formValues.form2} />
        </>
    );
}


function ListComponent({ members }: any) {


    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                members.map((member: any, index: number) => {
                    if(member.value){
                        let c =index + 1;
                        return <ListItem sx={{ background: 'lightgrey', marginTop: '10px' }}>
                            <ListItemText primary={member.value} secondary={'member ' + c} />
                        </ListItem>
                    }
                    else{
                        return <></>
                    }
                   
                })
            }

        </List>
    );
}

