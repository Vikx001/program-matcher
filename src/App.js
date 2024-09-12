import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const UGData = {
  "UG": [
    {
      "section": "Student Personal Information",
      "fields": [
        { "label": "Name", "type": "text", "preFilled": true },
        { "label": "Country of Residence", "type": "search", "options": ["USA", "Canada", "UK", "Germany", "India", "France"] },
        { "label": "Preferred University Location", "type": "dropdown", "options": ["Canada", "France", "Germany", "India", "UK", "USA", "No Preference"] },
        { "label": "Intended Undergraduate Major", "type": "dropdown", "options": ["Computer Science", "Mathematics", "Biology", "Engineering", "Economics", "No Preference"] },
        { "label": "Estimated/Current GPA Range", "type": "dropdown", "options": ["More than 3.9", "3.7 - 3.9", "3.5 - 3.7", "Less than 3.5"] },
        { "label": "Test Scores", "type": "dropdown", "options": ["SAT", "ACT", "Both"] },
        { "label": "AP Classes Taken/Planning to Take", "type": "dropdown", "options": ["None", "1 - 3", "4 - 6", "7 - 9", "10 - 12", "More than 12"] },
        { "label": "Number of Extracurriculars", "type": "dropdown", "options": ["None", "1 - 2", "3 - 4", "5 - 6", "More than 6"] },
        { "label": "Level of Extracurricular Involvement", "type": "dropdown", "options": ["School Level", "Regional", "State", "National", "International"] }
      ]
    },
    {
      "section": "Institutional Preferences",
      "fields": [
        { "label": "Preferred Range of University Rankings", "type": "dropdown", "options": ["Top 10", "Top 20", "Top 50", "Top 100", "Top 200", "Top 500", "Top 1000", "No Preference"] },
        { "label": "Preferred Acceptance Rate", "type": "dropdown", "options": ["Below 5%", "5% - 9.9%", "10% - 14.9%", "15% - 24.9%", "25% - 49.9%", "50% - 75%", "Above 75%", "No Preference"] },
        { "label": "Preferred University Size", "type": "dropdown", "options": ["More than 30,000 students", "15,001 - 30,000 students", "10,001 - 15,000 students", "5,001 - 10,000 students", "3,000 - 5,000 students", "Less than 3,000 students", "No Preference"] },
        { "label": "Preferred Campus Setting", "type": "dropdown", "options": ["College Town", "Small City", "Big City"] },
        { "label": "Preferred Graduation Rate", "type": "dropdown", "options": ["Above 95%", "90% - 95%", "80% - 89.9%", "75% - 79.9%", "Below 75%", "No Preference"] },
        { "label": "Preferred International Students %", "type": "dropdown", "options": ["Above 70%", "50% - 70%", "20% - 49.9%", "10% - 19.9%", "Below 10%", "No Preference"] }
      ]
    },
    {
      "section": "Finances",
      "fields": [
        { "label": "Preferred Tuition Fee Range", "type": "dropdown", "options": ["More than $50,000", "$40,000 - $50,000", "$30,000 - $39,999", "$20,000 - $29,999", "Less than $20,000", "No Preference"] },
        { "label": "Financial Aid Required", "type": "dropdown", "options": ["Yes", "No Preference"] }
      ]
    }
  ]
};

const MBAData = {
  "MBA": [
    {
      "section": "Student Personal Information",
      "fields": [
        { "label": "Name", "type": "text", "preFilled": true },
        { "label": "Age", "type": "dropdown", "options": ["21-24", "25-29", "30-34", "35+"] },
        { "label": "Country of Residence", "type": "search", "options": ["USA", "Canada", "UK", "Germany", "India", "France"] },
        { "label": "Undergraduate Major", "type": "search", "options": ["Business", "Engineering", "Economics", "Mathematics", "Computer Science", "No Preference"] }
      ]
    },
    {
      "section": "Student Academic Background",
      "fields": [
        { "label": "Undergraduate GPA Range", "type": "dropdown", "options": ["More than 3.7", "3.5 - 3.7", "3.3 - 3.49", "Less than 3.3"] },
        { "label": "Test Scores", "type": "dropdown", "options": ["GMAT", "GMAT Focus Edition", "GRE"] },
        { "label": "GMAT Score Range", "type": "dropdown", "options": ["More than 730", "700 - 730", "670 - 699", "Less than 670"] },
        { "label": "GMAT Focus Edition Range", "type": "dropdown", "options": ["More than 685", "655 - 685", "615 - 654", "Less than 615"] },
        { "label": "GRE Score Range", "type": "dropdown", "options": ["More than 331", "327 - 331", "324 - 326", "Less than 324"] },
        { "label": "Advanced Degrees", "type": "dropdown", "options": ["Yes (Please Specify)", "No"] },
        { "label": "Total Years of Work Experience", "type": "dropdown", "options": ["0-2", "3-5", "6-9", "10+"] }
      ]
    },
    {
      "section": "Institutional Preferences",
      "fields": [
        { "label": "Preferred Program Length", "type": "dropdown", "options": ["1 Year", "1.5 Years", "2 Years", "No Preference"] },
        { "label": "Preferred Range of University Rankings", "type": "dropdown", "options": ["Top 10", "Top 20", "Top 25", "No Preference"] },
        { "label": "Preferred Campus Setting", "type": "dropdown", "options": ["College Town", "Small City", "Big City", "No Preference"] },
        { "label": "Preferred Class Size", "type": "dropdown", "options": ["More than 800", "400 - 800", "100 - 399", "Less than 100", "No Preference"] },
        { "label": "Preferred Percentage of International Students", "type": "dropdown", "options": ["More than 80%", "60% - 80%", "40% - 59%", "Less than 40%", "No Preference"] },
        { "label": "Preferred Employment Rate Post-MBA", "type": "dropdown", "options": ["More than 95%", "93% - 95%", "90% - 92.9%", "Less than 90%", "No Preference"] },
        { "label": "Expected Average Graduate Compensation", "type": "dropdown", "options": ["More than $150,000", "$100,000 - $149,999", "Less than $100,000", "No Preference"] },
        { "label": "Preferred Post-MBA Industry", "type": "dropdown", "options": ["Consulting", "Technology", "Finance", "Financial Services", "Investment Banking", "Banking", "Accounting", "Marketing", "Business/Data Analytics", "Consumer Packaged Goods", "Energy", "Private Equity", "Investment Management", "Professional/Advisory Services", "Auto/Aerospace", "Telecommunication", "Entertainment/Media/Sports", "Corporate Management", "General Management", "No Preference"] }
      ]
    },
    {
      "section": "Finances",
      "fields": [
        { "label": "Preferred Annual Fee Range", "type": "dropdown", "options": ["More than $90,000", "$75,000 - $89,999", "$60,000 - $74,999", "Less than $60,000", "No Preference"] },
        { "label": "Financial Aid Required", "type": "dropdown", "options": ["Yes", "No Preference"] }
      ]
    }
  ]
};

const theme = createTheme();

// Sample university data for demonstration
const sampleUniversities = [
  { name: 'Harvard University', gpa: '3.5 - 4.0', gmat: '720 - 750' },
  { name: 'Stanford University', gpa: '3.6 - 4.0', gmat: '730 - 760' },
  { name: 'University of California, Berkeley', gpa: '3.4 - 4.0', gmat: '710 - 740' },
  { name: 'Massachusetts Institute of Technology (MIT)', gpa: '3.7 - 4.0', gmat: '740 - 770' },
  { name: 'University of Chicago', gpa: '3.5 - 4.0', gmat: '700 - 730' },
];

const App = () => {
  const [formType, setFormType] = useState('UG'); // Default to UG
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [openLogic, setOpenLogic] = useState(false); // State for opening/closing logic modal
  const data = formType === 'UG' ? UGData.UG : MBAData.MBA;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Simulate form submission
      setLoading(false);
      alert('Form submitted!');
    }, 1000);
  };

  const handleOpenLogic = () => {
    setOpenLogic(true);
  };

  const handleCloseLogic = () => {
    setOpenLogic(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            {formType} Form
          </Typography>
          <Box mb={2}>
            <Button
              variant="contained"
              color={formType === 'UG' ? 'primary' : 'default'}
              onClick={() => setFormType('UG')}
            >
              UG Final
            </Button>
            <Button
              variant="contained"
              color={formType === 'MBA' ? 'primary' : 'default'}
              onClick={() => setFormType('MBA')}
              style={{ marginLeft: 8 }}
            >
              MBA Final
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenLogic}
          >
            Show Logic
          </Button>
          <form onSubmit={handleSubmit}>
            {data.map((section, sectionIndex) => (
              <Box key={sectionIndex} mb={4}>
                <Typography variant="h6" gutterBottom>
                  {section.section}
                </Typography>
                {section.fields.map((field, fieldIndex) => (
                  <Box key={fieldIndex} mb={2}>
                    <Typography variant="body1" gutterBottom>
                      {field.label}
                    </Typography>
                    {field.type === 'text' && <TextField fullWidth variant="outlined" />}
                    {field.type === 'search' && (
                      <TextField
                        fullWidth
                        variant="outlined"
                        select
                        label={field.label}
                        SelectProps={{ native: true }}
                      >
                        {field.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>{option}</option>
                        ))}
                      </TextField>
                    )}
                    {field.type === 'dropdown' && (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>{field.label}</InputLabel>
                        <Select label={field.label}>
                          {field.options.map((option, optionIndex) => (
                            <MenuItem key={optionIndex} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Box>
                ))}
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              endIcon={loading && <CircularProgress size={24} />}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Box>
        <Dialog open={openLogic} onClose={handleCloseLogic} fullWidth>
          <DialogTitle>
            <Typography variant="h6">How Filtering Works for University Selection</Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseLogic} aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Filtering Logic
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Initial Selection:</strong> You start by making selections from various categories such as Undergraduate GPA Range, Test Scores, Program Length, etc.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>GPA Range Example:</strong> Suppose you select the GPA range "3.4 - 3.49". This means you are interested in universities where the required GPA falls within this range.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Filter Universities:</strong> The system will first look for universities that require a GPA within "3.4 - 3.49". For instance, if a university accepts a GPA range of "3.2 - 3.42", it will still appear in the results because its range overlaps with the selected range.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Test Scores Example:</strong> Next, you might choose a GMAT score range, say "710 - 730". The list of universities is now filtered based on both the GPA range and the GMAT score range. Only universities that meet both criteria will be shown. If out of the previously filtered universities, only some have GMAT scores within "710 - 730", only those universities will appear in the final results.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Layered Filtering:</strong> Each selection you make further narrows down the list of universities. If you select "No Preference" for certain fields, those fields will not affect the filtering. However, selections in other fields will continue to refine the list.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Dynamic Updates:</strong> As you make or change selections, the list of matching universities updates automatically to reflect your criteria. This ensures that the results are always relevant to your preferences.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Visualizing the Process:</strong> Imagine a Funnel:
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Wide Opening:</strong> The funnel starts wide, including all available universities.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Narrowing:</strong> As you apply each filter (e.g., GPA, GMAT score, location), the funnel narrows down, removing universities that do not meet the criteria.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Final Result:</strong> At the end, you see only those universities that fit all of your selected criteria.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Example Scenario:</strong>
                  <ul>
                    <li><strong>Initial Selection:</strong> GPA Range "3.4 - 3.49".</li>
                    <li><strong>Secondary Selection:</strong> GMAT Score Range "710 - 730".</li>
                    <li><strong>Result:</strong> You might start with 100 universities. After filtering by GPA, you might have 50. After filtering by GMAT score, you might end up with 20 universities that match both criteria.</li>
                  </ul>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Intuition
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Approach:</strong> The filtering approach involves narrowing down the list of universities step-by-step based on user selections. Each criterion you set helps in filtering the universities that meet your requirements. This iterative approach ensures that the final list of universities aligns well with your preferences.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Complexity:</strong>
                  <ul>
                    <li><strong>Time Complexity:</strong> The time complexity is generally O(n) where n is the number of universities to be filtered. Each filter operation typically involves scanning through the list of universities, but the exact complexity can vary based on the number of criteria and the efficiency of the filtering algorithms.</li>
                    <li><strong>Space Complexity:</strong> The space complexity is O(k) where k is the number of universities that match the criteria. This is because only the filtered universities need to be stored and processed.</li>
                  </ul>
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Logic (AND/OR):</strong> The filtering logic uses an AND approach where universities must meet all selected criteria to be included in the results. If any criterion is set to "No Preference," it is ignored in the filtering process.
                </Typography>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogic} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default App;
