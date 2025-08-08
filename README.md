# Asana Task Data Extractor

## Overview

This Google Apps Script project extracts comprehensive task data from Asana projects and workspaces, including task details, assignees, due dates, completion status, and custom field information. The system processes all projects within a workspace and exports the data to Google Sheets for analysis and reporting.

## Features

- **Asana API Integration**: Connects to Asana API to fetch workspace and project data
- **Comprehensive Task Extraction**: Retrieves all tasks with detailed information
- **Custom Field Processing**: Handles custom fields, specifically "SITE" field extraction
- **Pagination Support**: Handles large datasets with automatic pagination
- **Team Information**: Extracts team names associated with projects
- **Google Sheets Integration**: Exports processed data to structured spreadsheets
- **Assignee Tracking**: Captures assignee names and task ownership
- **Due Date Management**: Tracks task due dates and completion status

## File Structure

- **`.clasp.json`**: Google Apps Script CLI configuration
- **`appsscript.json`**: Apps Script manifest file
- **`Asana.js`**: Core Asana API integration functions
- **`Code.js`**: Main data extraction and processing logic
- **`Utils.js`**: Utility functions for custom field processing
- **`Sheet.js`**: Google Sheets writing functions
- **`Test.js`**: Testing and debugging functions

## Setup Instructions

### Prerequisites

1. **Google Apps Script Project**: Create a new Google Apps Script project
2. **Asana Account**: Access to Asana workspace with API permissions
3. **Google Sheets**: Spreadsheet with a sheet named "List"

### Configuration

1. **Replace Placeholders**: Update the following placeholders in the code:
   - `YOUR_SCRIPT_ID_HERE` in `.clasp.json`
   - `YOUR_ASANA_ACCESS_TOKEN` in `Asana.js`
   - `YOUR_WORKSPACE_ID` in `Code.js` and `Test.js`

2. **Asana Setup**:
   - Generate an API access token in your Asana account
   - Identify your workspace ID
   - Ensure your account has appropriate API permissions
   - Verify custom fields exist (especially "SITE" field if needed)

3. **Google Sheets Setup**:
   - Create a sheet named "List" in your spreadsheet
   - Ensure the sheet has appropriate columns for the data structure

## Usage

### Main Functions

1. **`getData()`**: Main function that extracts all task data from the workspace
2. **`test()`**: Test function to verify custom field access
3. **`fetchFromAsanaAPI(api, parameters)`**: Core API function for Asana requests
4. **`hasSite(customFields)`**: Processes custom fields to extract site information
5. **`writeToSpreadsheet(sheetData)`**: Writes processed data to Google Sheets

### Data Processing Flow

1. **Workspace Projects**: Retrieves all projects in the specified workspace
2. **Project Details**: Fetches detailed information for each project including team names
3. **Task Extraction**: Extracts all tasks from each project with pagination support
4. **Custom Field Processing**: Processes custom fields to extract site information
5. **Data Structuring**: Organizes data into structured arrays
6. **Sheet Export**: Writes processed data to Google Sheets

### Data Structure

The extracted data includes the following columns:
- **Task ID**: Unique Asana task identifier
- **Task Name**: Name/description of the task
- **Project Name**: Name of the project containing the task
- **Assignee Name**: Name of the person assigned to the task
- **Due Date**: Task due date (if set)
- **Completion Status**: Whether the task is completed
- **Site Value**: Custom field value for site information
- **Team Name**: Name of the team associated with the project

## API Configuration

The script uses Asana's REST API with the following configuration:
- **Base URL**: `https://app.asana.com/api/1.0/`
- **Authentication**: Bearer token in Authorization header
- **Rate Limiting**: Built-in pagination support for large datasets

### API Headers:
```javascript
{
  "method": "get",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer YOUR_ASANA_ACCESS_TOKEN"
  }
}
```

## Custom Fields Processing

The system includes specialized handling for custom fields:
- **Site Field Detection**: Automatically detects and extracts "SITE" custom field values
- **Enum Value Processing**: Handles enum-type custom fields with proper value extraction
- **Null Value Handling**: Gracefully handles missing or null custom field values

### Custom Field Structure:
```javascript
{
  bool: true/false,    // Whether the field was found
  value: "field_value" // The actual field value
}
```

## Functions Reference

### Core Functions

- `getData()`: Main function for extracting all task data
- `fetchFromAsanaAPI(api, parameters)`: Makes API requests to Asana
- `writeToSpreadsheet(sheetData)`: Writes data to Google Sheets

### Utility Functions

- `hasSite(customFields)`: Processes custom fields to extract site information
- `getSiteValue()`: Placeholder function for additional site processing

### Testing Functions

- `test()`: Tests custom field access and workspace connectivity

## Data Extraction Details

### Project Processing:
- Retrieves all projects in the workspace
- Extracts project details including team information
- Processes each project individually

### Task Processing:
- Fetches tasks with detailed fields (assignee, due date, completion status, custom fields)
- Implements pagination for projects with many tasks
- Processes custom fields for each task

### Pagination Support:
- Handles projects with more than 100 tasks
- Uses offset tokens for efficient data retrieval
- Continues until all tasks are processed

## Security Notes

- **Access Tokens**: Store Asana access tokens securely
- **Script ID**: Keep the script ID private
- **Workspace ID**: Ensure workspace ID is correct for your organization
- **API Permissions**: Use minimal required permissions for Asana API access
- **Data Access**: Ensure appropriate permissions for Google Sheets

## Troubleshooting

1. **Authentication Errors**: Verify Asana access token is valid and has appropriate permissions
2. **Workspace Not Found**: Ensure workspace ID is correct and accessible
3. **Custom Field Errors**: Verify custom fields exist in your Asana setup
4. **Sheet Not Found**: Ensure "List" sheet exists in your spreadsheet
5. **API Rate Limits**: Asana API has rate limits; the script includes pagination support
6. **Data Format Issues**: Verify API response structure matches expected format

## Development

- Use the `test()` function to verify API connectivity
- Check Apps Script logs for detailed execution information
- Test with small workspaces before processing large datasets
- Monitor API usage to stay within rate limits
- Verify custom field mappings for your specific setup

## Performance Considerations

- **Pagination**: Built-in pagination handles large datasets efficiently
- **Batch Processing**: Processes projects sequentially to avoid overwhelming the API
- **Error Handling**: Graceful handling of missing data and API errors
- **Memory Management**: Efficient data structures for large task arrays

## Integration Examples

### Manual Execution:
```javascript
// Run the main data extraction
getData();

// Test custom field access
test();
```

### Automated Execution:
- Set up time-based triggers in Apps Script
- Configure web app deployment for external access
- Use Google Apps Script API for programmatic execution
