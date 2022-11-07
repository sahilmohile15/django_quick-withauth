import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import "./pl.css";

export default function PLAdd() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        flex: 1,
        padding: 20,
      }}
    >
      <h4 style={{ margin: "auto" }}>Add Content</h4>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <div className={"plAddForm"}>
            <TextField
              required
              id="outlined-required"
              label="Subject Code"
              sx={{ m: 1, width: "75%" }}
            />
            <TextField
              required
              id="outlined-required"
              label="Subject"
              sx={{ m: 1, width: "75%" }}
            />

            <TextField
              label="Description"
              multiline
              rows={4}
              sx={{ m: 1, width: "75%" }}
            />

            <Button variant="contained" color="primary" size="Large">
              Save
            </Button>
          </div>
          <hr />
        </Grid>
        <Grid xs={6}>
          <div className={"plAddForm"}>
            <Box display="flex" sx={{ width: "75%" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="subject-branch-label">Subject</InputLabel>
                <Select
                  labelId="subject-branch-label"
                  id="subject-brach-select"
                  // value={age}
                  label="Subject"
                  // onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
              
            </Box>

            <TextField
              required
              id="outlined-required"
              label="Branch Code"
              sx={{ m: 1, width: "75%" }}
            />
            <TextField
              required
              id="outlined-required"
              label="Branch"
              sx={{ m: 1, width: "75%" }}
            />

            <TextField
              label="Description"
              multiline
              rows={4}
              sx={{ m: 1, width: "75%" }}
            />

            <Button variant="contained" color="primary" size="Large">
              Save
            </Button>
          </div>
          <hr />
        </Grid>
        <Grid xs={6}>
          <div className={"plAddForm"}>
            <Box display="flex" sx={{ width: "75%" }}>
              <FormControl sx={{ width: "50%" }}>
                <InputLabel id="subject-branch-label">Subject</InputLabel>
                <Select
                  labelId="subject-branch-label"
                  id="demo-simple-select-helper"
                  // value={age}
                  label="Subject"
                  // onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ ml: 2, width: "50%" }}>
                <InputLabel id="subject-branch-label">Branch</InputLabel>
                <Select
                  labelId="subject-branch-label"
                  id="demo-simple-select-helper"
                  // value={age}
                  label="Subject"
                  // onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              required
              id="outlined-required"
              label="Section Code"
              sx={{ m: 1, width: "75%" }}
            />
            <TextField
              required
              id="outlined-required"
              label="Section"
              sx={{ m: 1, width: "75%" }}
            />

            <TextField
              label="Description"
              multiline
              rows={4}
              sx={{ m: 1, width: "75%" }}
            />

            <Button variant="contained" color="primary" size="Large">
              Save
            </Button>
          </div>
          <hr />
        </Grid>
        <Grid xs={6}>
          <div className={"plAddForm"}>
            <TextField
              required
              id="outlined-required"
              label="Topic Code"
              sx={{ m: 1, width: "75%" }}
            />
            <TextField
              required
              id="outlined-required"
              label="Topic"
              sx={{ m: 1, width: "75%" }}
            />

            <TextField
              label="Description"
              multiline
              rows={4}
              sx={{ m: 1, width: "75%" }}
            />

            <Button variant="contained" color="primary" size="Large">
              Save
            </Button>
          </div>
          <hr />
        </Grid>
        <Grid xs={6}>
          <div className={"plAddForm"}>
            <TextField
              required
              id="outlined-required"
              label="Lesson Code"
              sx={{ m: 1, width: "75%" }}
            />
            <TextField
              required
              id="outlined-required"
              label="Lesson"
              sx={{ m: 1, width: "75%" }}
            />

            <TextField
              label="Description"
              multiline
              rows={4}
              sx={{ m: 1, width: "75%" }}
            />

            <Button variant="contained" color="primary" size="Large">
              Save
            </Button>
          </div>
          <hr />
        </Grid>
      </Grid>
    </div>
  );
}
