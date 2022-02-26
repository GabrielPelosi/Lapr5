import { TagCloud } from "react-tagcloud";
import React from "react";
import { useEffect } from "react";
import { TagCloudInitialState } from "../../dto/TagCloudTagsUtilizadorDto/TagCloudUtilizadorDtoInitialState";
import getUserTagCloud from "../../Service/TagCloudTagsUtilizadorService";
import { Typography } from "@mui/material";
import randomColor from "randomcolor";

const MyTagsCloud = () => {
  const [tagCloud, setTagCloud] = React.useState(TagCloudInitialState);

  useEffect(() => {
    getUserTagCloud(setTagCloud);
  }, []);

  return (
    <div style={{ margin: 100, padding: 50 }}>
      <h1 style={{ backgroundColor: " #1875D2", color: "white" }}>
        My Tags - Tag Cloud
      </h1>

      {/* <TagCloud tags={tagCloud} /> */}

      {tagCloud.map((data) => (
        <Typography
          sx={{ fontSize: data.counter + 20, color: () => randomColor() }}
          gutterBottom
        >
          {data.value}
        </Typography>
      ))}
    </div>
  );
};

export default MyTagsCloud;
