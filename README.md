# Imagical presentation

Imagical presentation is a very simple presentation software based on the web platform.

## General idea
The general idea of Imagical presentation is that the presentation is only one image. And in every single slide, a particular aspect of that image is shown.

## Making presentation
So making a presentation is nothing but making an Image, copying it in the project folder, and specifying some aspects of that image in the project.

## How to use

### Clone the project
First of all clone the project in your system.
```bash
git clone https://github.com/aminevaali/Imagical-presentation.git
```

### Make an image
Then with any software of your choice, create a photo for your presentation. Preferably in '.svg' format. Then put it in img folder in the project folder instead of 'image.svg' file.

### Add some aspects of your image
Find pixel addresses of corners in a desired software. Then add an aspect to your presentation like below. you can find such codes in <script> tag in index.html file.
`
aspects.push(new Aspect(0, 813, 0, 1343))
`
The first parameter is left side of the aspect, second one for right side, third one for top side and fourth one for bottom side.

## Do your best!
Now after saving the changes in index.html just open it using a web browser and do your best.
You can go to next or previous slides using arrow right and arrow left keys on your keyboard.

happy presentation:)
