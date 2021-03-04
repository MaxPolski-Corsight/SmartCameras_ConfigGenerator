import React , {useState,useEffect} from 'react'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AccordionDetails from "@material-ui/core/AccordionDetails";
import FormControl from '@material-ui/core/FormControl';




const useStyles = makeStyles((theme) => ({
    textField: {
        paddingTop: theme.spacing(2),
    },
    btn:{
        marginBottom : theme.spacing(3),
    },
    root: {
        display: 'block',
        //display:'flex',
        '& .MuiTextField-root': {
          marginTop: theme.spacing(1),
          marginBottom : theme.spacing(1),

          
          
        }
    },
}))

function ArrayServiceItem(props) {
    const [arrayList,setArrayList] = useState(props.array);
    const [firstRender,setFirstRender] = useState(true);
    const classes = useStyles();
    const sendChagneFunction = props.fun;
    const rules = props.rules;
    const handleAddButton = () => {
        setArrayList([...arrayList,'']);
    }
    const handleRemoveButton = (indexToRemove) => {
        setArrayList(arrayList.filter((_,index)=>index!==indexToRemove));
    }
    const handleChangeItem = (e,index) =>{
        const newArrayList = [...arrayList];
        newArrayList[index] = e.target.value;
        setArrayList(newArrayList);
    }
    
    // this will enable to track chnages only after the first render (not include)
    useEffect(()=>{
        setFirstRender(false);
    },[])


    useEffect(()=>{
        if(!firstRender){
            console.log(arrayList.length);

            if(arrayList.length != rules[0]){
                alert('Please add a variable')
            }

            sendChagneFunction(arrayList)
        }
            
    },[arrayList])
 
    return (
        <AccordionDetails>
            <FormControl fullWidth className={classes.root} variant="outlined">
            <Button className={classes.btn}   color="primary" variant="contained" onClick={handleAddButton}>Add</Button>
            {arrayList.length>0 && arrayList.map( (i,index) => 
            <>
                            <TextField
                            variant="outlined"
                             id={`${props.keyName} ${index}`}
                             label={`${props.keyName} ${index}`}
                             onChange={(e) => handleChangeItem(e,index)}
                             defaultValue={i} />
                             <Button
                             onClick={()=>handleRemoveButton(index)}
                              variant="contained" >
                                 Remove
                             </Button>
            </>
            )}
         </FormControl>   
        </AccordionDetails>
    )
}

export default ArrayServiceItem
