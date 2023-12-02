from transformers import pipeline

classifier = pipeline("sentiment-analysis")

print(classifier("The new design is awful!"))
