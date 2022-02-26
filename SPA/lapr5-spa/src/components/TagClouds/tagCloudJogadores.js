import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';
import Text from 'antd/lib/typography/Text';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { getAllJogadores } from "../../apis/MasterDataRedeSocial";
import {TagCloud} from 'react-tagcloud'

const useStyles = makeStyles({
    root: {
        margin: '31px'
    },
});

const TagCloudJogadores = () => {
    const classes = useStyles();
    const [test, setTeste] = useState([]);

    
    React.useEffect(() => {
        getAllJogadores(setTeste);
    },[])  

    const tagsRepetidas =[];
    const tags=[];
    const counter=[];
    
    for(var jogador in test){
       for(var tag in test[jogador].tagsInteresse)
       tagsRepetidas.push(test[jogador].tagsInteresse[tag])
    }

    //console.log(tagsRepetidas)

    for (var tag in tagsRepetidas){
        if(!tags.includes(tagsRepetidas[tag]))
            tags.push(tagsRepetidas[tag])
    }

    
       
    for(var t in tags){
        let c=0;
        for(var x in tagsRepetidas){
            if(tags[t]==tagsRepetidas[x])
            c++;
        }
        counter.push(c);
    }


    const data=[];

    for(x=0;x<tags.length;x++){
        data.push({value:tags[x], count:counter[x]})
    }

    return(
        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"

                style={{ marginTop: 300, minHeight: '30vh' }}
            ><TagCloud
            minSize={12}
            maxSize={35}
            tags={data}
            className="simple-cloud"
            onClick={(tag) => alert(`'${tag.value}' was selected!`)}
          />        
         </Grid>
    )
};

export default TagCloudJogadores


