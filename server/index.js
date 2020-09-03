const express = require("express");
const superagent = require("superagent");
const app = express();
const body = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

var queryOb = {
  start_date: "2015-09-07",
  end_date: "2015-09-08",
  api_key: "cGzaH6eGIQltl9uLkdWEDchSn2JrfTu8xUZ0jSrV",
};

var globalObj = [];

const getData = () => {
  //  superagent
  //   .get("https://api.nasa.gov/neo/rest/v1/feed")
  //   .query(queryOb)
  //   .end((err, res) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     //SPeed for end date
  //     const data = res.body.near_earth_objects;
  //     const dataSD1 = data[queryOb.end_date.toString()];
  //     const speedData1 = dataSD1.map((v) => {
  //       return {data:v.close_approach_data[0].relative_velocity,id:v.id};
  //     });
  //     const speed1 = speedData1.map((val) => {
  //       return {speed:val.data.kilometers_per_second,id:val.id};
  //     });
  //     console.log(speed1)
  //     const dist1 = dataSD1.map((val) => {
  //       return {dist:val.close_approach_data[0].miss_distance.kilometers,id:val.id};
  //     });
  //     console.log(dist1)
  //     let minDist1= dist1[0].dist; let minDist1ID=dist1[0].id;
  //     for(let i =0;i<dist1.length;i++)
  //     {
  //         if(parseInt(dist1[i].dist)<parseInt(minDist1))
  //         {
  //                 minDist1=dist1[i].dist;
  //                 minDist1ID=dist1[i].id;
  //         }
  //     }
  //     console.log(minDist1+"outise for")
  //     console.log(minDist1ID)
  //     let maxSpeed1=speed1[0].speed; let maxSpeed1ID;
  //     for(let i =0;i<speed1.length;i++)
  //     {
  //         if(parseInt(speed1[i].speed)>parseInt(maxSpeed1))
  //         {
  //                 maxSpeed1=speed1[i].speed;
  //                 maxSpeed1ID=speed1[i].id;
  //         }
  //     }
  //     // console.log(maxSpeed1)
  //     // console.log(maxSpeed1ID)
  //     const dim1 = dataSD1.map((val) => {
  //       return (
  //         val.estimated_diameter.kilometers.estimated_diameter_max -
  //         val.estimated_diameter.kilometers.estimated_diameter_min
  //       );
  //     });
  //     const avgDim1= dim1.reduce((sume, el) => sume + el, 0) / dim1.length;
  //     //Speed for start date
  //     const dataSD2 = data[queryOb.start_date.toString()];
  //     const speedData2 = dataSD2.map((v) => {
  //         return {data:v.close_approach_data[0].relative_velocity,id:v.id};
  //     });
  //     const speed2 = speedData2.map((val) => {
  //         return {speed:val.data.kilometers_per_second,id:val.id};
  //     });
  //     const dist2 = dataSD2.map((val) => {
  //         return {dist:val.close_approach_data[0].miss_distance.kilometers,id:val.id};
  //     });
  //     const dim2 = dataSD2.map((val) => {
  //       return (
  //         val.estimated_diameter.kilometers.estimated_diameter_max -
  //         val.estimated_diameter.kilometers.estimated_diameter_min
  //       );
  //     });
  //     const avgDim2=dim2.reduce((sume, el) => sume + el, 0) / dim2.length;
  //     let minDist2=minDist1; let minDist2ID=minDist1ID;
  //     for(let i =0;i<dist2.length;i++)
  //     {
  //         if(parseInt(dist2[i].dist)<parseInt(minDist1))
  //         {
  //                 minDist2=dist2[i].dist;
  //                 minDist2ID=dist2[i].id;
  //         }
  //     }
  //     console.log(minDist2)
  //     console.log(minDist2ID)
  //     let maxSpeed2=maxSpeed1; let maxSpeed2ID=maxSpeed1ID;
  //     for(let i =0;i<speed2.length;i++)
  //     {
  //         if(parseInt(speed2[i].speed)>parseInt(maxSpeed1))
  //         {
  //                 maxSpeed2=speed2[i].speed;
  //                 maxSpeed2ID=speed2[i].id;
  //         }
  //     }
  //     console.log(maxSpeed2)
  //     console.log(maxSpeed2ID)
  //     const avgRad = ((avgDim1+avgDim2)/4);
  //     const avgSize = 4*3.14*avgRad*avgRad*avgRad;
  //     var output={minDist : minDist2,
  //         minDistId: minDist2ID,
  //         maxSpeed : maxSpeed2,
  //         maxSpeedId: maxSpeed2ID,
  //         avgerageSize :avgSize
  //     }
  //     console.log(output)
  //     globalObj=output
  //   });
};

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(((req.body.start_date).split('T')[0]))
  console.log(((req.body.end_date)))
  queryOb.start_date = ((req.body.start_date).split('T')[0]);
  queryOb.end_date = ((req.body.end_date).split('T')[0]);

  superagent
    .get("https://api.nasa.gov/neo/rest/v1/feed")
    .query(queryOb)
    .end((err, res) => {
      if (err) {
        return console.log(err);
      }
      //SPeed for end date
      const data = res.body.near_earth_objects;
      const dataSD1 = data[queryOb.end_date.toString()];
      const speedData1 = dataSD1.map((v) => {
        return { data: v.close_approach_data[0].relative_velocity, id: v.id };
      });
      const speed1 = speedData1.map((val) => {
        return { speed: val.data.kilometers_per_second, id: val.id };
      });
      console.log(speed1);
      const dist1 = dataSD1.map((val) => {
        return {
          dist: val.close_approach_data[0].miss_distance.kilometers,
          id: val.id,
        };
      });
      console.log(dist1);
      let minDist1 = dist1[0].dist;
      let minDist1ID = dist1[0].id;

      for (let i = 0; i < dist1.length; i++) {
        if (parseInt(dist1[i].dist) < parseInt(minDist1)) {
          minDist1 = dist1[i].dist;
          minDist1ID = dist1[i].id;
        }
      }

      console.log(minDist1 + "outise for");
      console.log(minDist1ID);

      let maxSpeed1 = speed1[0].speed;
      let maxSpeed1ID;
      for (let i = 0; i < speed1.length; i++) {
        if (parseInt(speed1[i].speed) > parseInt(maxSpeed1)) {
          maxSpeed1 = speed1[i].speed;
          maxSpeed1ID = speed1[i].id;
        }
      }
      // console.log(maxSpeed1)
      // console.log(maxSpeed1ID)

      const dim1 = dataSD1.map((val) => {
        return (
          val.estimated_diameter.kilometers.estimated_diameter_max -
          val.estimated_diameter.kilometers.estimated_diameter_min
        );
      });
      const avgDim1 = dim1.reduce((sume, el) => sume + el, 0) / dim1.length;

      //Speed for start date
      const dataSD2 = data[queryOb.start_date.toString()];
      const speedData2 = dataSD2.map((v) => {
        return { data: v.close_approach_data[0].relative_velocity, id: v.id };
      });
      const speed2 = speedData2.map((val) => {
        return { speed: val.data.kilometers_per_second, id: val.id };
      });
      const dist2 = dataSD2.map((val) => {
        return {
          dist: val.close_approach_data[0].miss_distance.kilometers,
          id: val.id,
        };
      });
      const dim2 = dataSD2.map((val) => {
        return (
          val.estimated_diameter.kilometers.estimated_diameter_max -
          val.estimated_diameter.kilometers.estimated_diameter_min
        );
      });
      const avgDim2 = dim2.reduce((sume, el) => sume + el, 0) / dim2.length;
      let minDist2 = minDist1;
      let minDist2ID = minDist1ID;
      for (let i = 0; i < dist2.length; i++) {
        if (parseInt(dist2[i].dist) < parseInt(minDist1)) {
          minDist2 = dist2[i].dist;
          minDist2ID = dist2[i].id;
        }
      }
      console.log(minDist2);
      console.log(minDist2ID);

      let maxSpeed2 = maxSpeed1;
      let maxSpeed2ID = maxSpeed1ID;
      for (let i = 0; i < speed2.length; i++) {
        if (parseInt(speed2[i].speed) > parseInt(maxSpeed1)) {
          maxSpeed2 = speed2[i].speed;
          maxSpeed2ID = speed2[i].id;
        }
      }
      console.log(maxSpeed2);
      console.log(maxSpeed2ID);
      const avgRad = (avgDim1 + avgDim2) / 4;
      const avgSize = 4 * 3.14 * avgRad * avgRad * avgRad;

      var output = {
        minDist: minDist2,
        minDistId: minDist2ID,
        maxSpeed: maxSpeed2,
        maxSpeedId: maxSpeed2ID,
        avgerageSize: avgSize,
      };
      console.log(output);
      globalObj.push(output);
      console.log(globalObj);
    });
 
});
app.get("/output",(req,res)=>{
  res.send(globalObj)
})
app.listen("4000", () => {
  console.log("Server started");
});
