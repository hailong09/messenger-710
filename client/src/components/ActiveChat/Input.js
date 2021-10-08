import React, { useState } from "react";
import { FormControl, FilledInput, IconButton, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import { PhotoCamera, Delete } from "@material-ui/icons";
import { styled } from "@material-ui/styles";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
  formControl: {
    position: "relative",
  },
  upLoadBtn: {
    position: "absolute",
    bottom: "50%",
    right: 0,
  },
  deleteIcon: {
    position: "absolute",
  },
}));

const UploadInput = styled("input")({
  display: "none",
});

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;
  const [filesAsUrl, setFileASURL] = useState([]);
  const handleDeleteImage = (img) => {
    const imageRef = ref(storage, `images/${img.name}`);

    deleteObject(imageRef)
      .then(() => {
        console.log("deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    const newImagesList = filesAsUrl.filter((file) => file.url !== img.url);
    setFileASURL([...newImagesList]);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleUploadChange = (event) => {
    const newImages = [...event.target.files];
    newImages.forEach((img) => {
      const storageRef = ref(storage, `images/${img.name}`);
      uploadBytes(storageRef, img)
        .then((snapshot) => {
          const url = getDownloadURL(snapshot.ref)
            .then((url) => {
              return url;
            })
            .catch((err) => err);
          return url;
        })
        .then((url) => {
          setFileASURL((prev) => [...prev, { url, name: img.name }]);
          return;
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.

    if (text !== "" || filesAsUrl.length > 0) {
      const reqBody = {
        text: event.target.text.value,
        recipientId: otherUser.id,
        conversationId,
        sender: conversationId ? null : user,
        attachments:
          filesAsUrl.length > 0 ? filesAsUrl.map((file) => file.url) : null,
      };

      await postMessage(reqBody);
      setText("");
      setFileASURL([]);
    }
  };

  return (
    <Box>
      {filesAsUrl.length > 0 && (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            height: "50px",
            display: "flex",
            bgcolor: "rgba(0, 0, 0, 0.13)",
            borderRadius: "10px",
          }}
        >
          {filesAsUrl.map((item) => (
            <Box sx={{ position: "relative" }} key={item.name}>
              <IconButton
                component="span"
                color="secondary"
                className={classes.deleteIcon}
                aria-label="delete-image"
                onClick={handleDeleteImage.bind(this, item)}
              >
                <Delete />
              </IconButton>
              <Box
                component="img"
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "5px 5px 5px 5px",
                  marginRight: "10px",
                }}
                alt={item.name}
                src={item.url}
              />
            </Box>
          ))}
        </Box>
      )}
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl className={classes.formControl} fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
          />
          <div className={classes.upLoadBtn}>
            <label htmlFor="icon-button-file">
              <UploadInput
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
                onChange={handleUploadChange}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </FormControl>
      </form>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
