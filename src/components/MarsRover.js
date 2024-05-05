import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Typography, TextField  } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';


function MarsRover() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(16);
  const [satelliteName, setSatelliteName] = useState("Curiosity");
  const [cameraName, setCameraName] = useState("MAST");
  const [solDays, setSolDays] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2015-06-03');
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const roverCameras = {
    Curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
    Opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    Spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"]
  };

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;
      let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${satelliteName}/photos?sol=${solDays}&camera=${cameraName}&earth_date=${selectedDate}&api_key=${NASA_KEY}`;
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData.photos || []);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, [satelliteName, cameraName, solDays, selectedDate]);

  const indexOfLastPic = currentPage * perPage;
  const indexOfFirstPic = indexOfLastPic - perPage;
  const currentPics = data.slice(indexOfFirstPic, indexOfLastPic);

  const totalPages = Math.ceil(data.length / perPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event) => {
    const selectedRover = event.target.value;
    setSatelliteName(selectedRover);
    setCameraName(roverCameras[selectedRover][0]);
  };

  const handleCamChange = (event) => {
    setCameraName(event.target.value);
  };

  const handleMartianDaysChange = (event) => {
    setSolDays(event.target.value);
  };

  const handleDateChange = (dateString) => {
    const selectedDateObj = new Date(dateString);
    const year = selectedDateObj.getFullYear();
    const month = String(selectedDateObj.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDateObj.getDate()).padStart(2, '0');
  
    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
    
    console.log("Formatted Date: ", formattedDate)
    setSelectedDate(formattedDate);
  };

  const handleInfoClick = () => {
    setOpenInfoDialog(true);
  };
  
  const handleInfoDialogClose = () => {
    setOpenInfoDialog(false);
  };
  

  return (
    <div className="rover-container">
      <div className="mars-rover-inputs">
        <Typography variant="h4" className="mars-rover-typo" style={{left: 500, top:20}}>MARS ROVER PHOTOS</Typography>
        <Typography variant="h4" className="mars-rover-des" style={{top: 75, paddingLeft: 80, paddingRight: 50, justifyContent: 'normal'}}>
          NASA's Mars Rover Photo API provides access to a vast collection of images captured by the various rovers exploring the Martian surface. These rovers, including Curiosity, Opportunity, and Spirit, have been meticulously documenting their surroundings and sending back valuable data to Earth. You have been provided with the ability to search pictures using different parameters such as the rover name, Martian day(Sol), camera used and the date.
        </Typography>
        <div className="mars-rover-inputs-rover">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 233 }}>
            <InputLabel id="demo-simple-select-standard-label">Select Rover</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={satelliteName}
              onChange={handleChange}
              label="Rover"
            >
              {Object.keys(roverCameras).map((rover) => (
                <MenuItem key={rover} value={rover}>{rover}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="mars-rover-inputs-camera">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 233 }}>
            <InputLabel id="demo-simple-select-standard-label">Select Camera</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={cameraName}
              onChange={handleCamChange}
              label="Camera"
            >
              {roverCameras[satelliteName].map((camera) => (
                <MenuItem key={camera} value={camera}>{camera}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="mars-rover-inputs-sol">
          <TextField
            id="standard-basic"
            label="Martian Days"
            variant="standard"
            sx={{ minWidth: 233, marginLeft: 1, marginTop: 1 }}
            value={solDays}
            onChange={handleMartianDaysChange}
          />
        </div>

        <div className="mars-rover-inputs-date">
          <TextField
            id="date"
            type="date"
            value={selectedDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleDateChange(e.target.value)}
            sx={{ minWidth: 250, marginTop: 0 }}
          />
          <IconButton onClick={handleInfoClick} style={{ color: 'white', position: 'relative', left: '280px', top: '30px' }}>
            <InfoOutlinedIcon/>
          </IconButton>
        </div>

        <Dialog open={openInfoDialog} onClose={handleInfoDialogClose}>
          <DialogTitle>Camera Details</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemText primary="FHAZ - Front Hazard Avoidance Camera" />
              </ListItem>
              <ListItem>
                <ListItemText primary="RHAZ - Rear Hazard Avoidance Camera" />
              </ListItem>
              <ListItem>
                <ListItemText primary="MAST - RMast Camera" />
              </ListItem>
              <ListItem>
                <ListItemText primary="CHEMCAM - Chemistry and Camera Complex" />
              </ListItem>
              <ListItem>
                <ListItemText primary="MAHLI - Mars Hand Lens Imager" />
              </ListItem>
              <ListItem>
                <ListItemText primary="MARDI - Mars Descent Imager" />
              </ListItem>
              <ListItem>
                <ListItemText primary="NAVCAM - Navigation Camera" />
              </ListItem>
              <ListItem>
                <ListItemText primary="PANCAM - Panoramic Camera" />
              </ListItem>
              <ListItem>
                <ListItemText primary="MINITES - Miniature Thermal Emission Spectrometer (Mini-TES)" />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>

      </div>

      <div className="rover_bg">
        <img src="./mars_rover_bg.jpg" alt="Mars Rover Background" />
      </div>

      {data.length === 0 && (
        <Typography variant="h4" className="no-content-message">NO CONTENT AVAILABLE</Typography>
      )}

      <div className="gallery">
        {currentPics.map((pic) => (
          <img
            key={pic.id}
            src={pic.img_src}
            alt={`Mars ${pic.id}`}
            className="gallery-image"
          />
        ))}
      </div>
      
      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? 'active' : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MarsRover;
