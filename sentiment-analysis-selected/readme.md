# Chrome Extension for Sentiment Analysis

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This Chrome extension allows you to detect the sentiment of a selected sentence by sending it to a locally running server that utilizes Hugging Face Transformers.

## Features

- Sentiment analysis of selected sentences.
- Easy-to-use Chrome extension.

## Installation

### Server

1. Create a conda environment:

   ```bash
   conda env create -f environment.yaml
2. Activate the conda environment:

   ```bash
   conda activate browser-inference
 
3. Install server requirements:

   ```bash
    pip install -r requirements.txt

### Chrome Extension
Load the extension located in the ext directory to Chrome.

### Usage
1. Start the server as instructed above.
   ```bash
    python server.py

2. Open chrome and navigate to page with text
3. Select a sentence on a webpage.
4. Click on the extension icon in the toolbar.
5. A popup will be displayed indicating whether the selected sentence has a POSITIVE or NEGATIVE sentiment.



### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Contact
For inquiries, contact Alex Lavrenov via alexei_lavrenov@yahoo.com.

Project Status
This project is [in development]