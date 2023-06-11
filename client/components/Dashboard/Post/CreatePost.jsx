import { Category } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  RadioGroup,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import CategoryService from '@services/category';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNewPost } from 'slices/post/post.slice';
import Editor from '../CustomEditor';

/**
 * @author
 * @function CreatePost
 **/

export const CreatePost = ({ categories }) => {
  //   console.log({ categories });
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0].id || 0
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkCanSubmit =() =>!!title.length && !!content.length && !!keywords.length 

  const clearData = () => {
    setActiveStep(0);
    setTitle('');
    setContent('');
    setSelectedCategory(0);
  };

  const handleSubmit = () => {
    const data = {
      title,
      body: content,
      keywords,
      categoryId: selectedCategory,
      year: new Date().getFullYear(),
    };

    dispatch(createNewPost({ body: data, callback: clearData }));
  };

  return (
    <React.Fragment>
      
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Choose a title</StepLabel>
            <StepContent>
              <Box>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Next
                  </Button>
                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel
            //   optional={<Typography variant="caption">Last step</Typography>}
            >
              Write body post
            </StepLabel>
            <StepContent>
              <Box>
                <Editor content={content} setContent={setContent} />

                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Next
                  </Button>
                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Choose a category</StepLabel>
            <StepContent>
              <Box>
                <Box sx={{ maxWidth: 200 }}>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={selectedCategory}
                      onChange={(e) =>
                        setSelectedCategory(parseInt(e.target.value))
                      }
                    >
                      {!!categories?.length &&
                        categories.map((category, i) => (
                          <FormControlLabel
                            key={i}
                            value={category.id}
                            label={category.name}
                            control={<Radio />}
                          />
                        ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Next
                  </Button>
                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Choose keyword for SEO</StepLabel>
            <StepContent>
              <Box>
                <TextField
                  label="Keywords"
                  variant="outlined"
                  fullWidth
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Next
                  </Button>
                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step optional={<Typography variant="caption">Last step</Typography>}>
            <StepLabel>Choose keyword for SEO</StepLabel>
            <StepContent>
              <Box>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={!checkCanSubmit()}
                  >
                    Publish
                  </Button>
                  <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Clear
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
      
    </React.Fragment>
  );
};
