//This script pastes image A into image B, in my case, Physical manga scans into Digital magazine psds.
//Make sure your files resolution matches, this means you can have 7200x9600px scans and 7200x10240px psds and it'll work fine.
//This part selects the folders.
alert("Select the folder with the processed scans");
var inputFolder = Folder.selectDialog("Select the folder with the processed scans");
alert("Select the folder with the documents that have the finished psds");
var outputFolder = Folder.selectDialog("Select the folder with the documents that have the finished psds");

OpenFolder();

function OpenFolder() {
    var filesOpened = 0;
    var fileListIn = inputFolder.getFiles(/\.(jpg|png|psd|raw)$/i);
    var fileListOut = outputFolder.getFiles(/\.(jpg|png|psd|raw)$/i);
        fileListIn.sort();
        fileListOut.sort();
		//This part opens 2 files, so make sure your folders have the same filenames/file ammount.
        for (var i = 0; i < fileListIn.length; i++) {
            open(fileListIn[i]);
            var inputFile = app.activeDocument;
            open(fileListOut[i]);
            var outputFile = app.activeDocument;
            filesOpened++;
            app.activeDocument = inputFile;
            duplicateToAll();
            app.activeDocument = outputFile;
            outputFile.save();
            outputFile.close(SaveOptions.DONOTSAVECHANGES);
            inputFile.close(SaveOptions.DONOTSAVECHANGES);
        }
        return filesOpened;
    }
	
//This is the part where it duplicates the layers
function duplicateToAll() {
    docs = app.documents;
    curDoc = app.activeDocument;
    for (var i = 0; i < docs.length; i++) {
        if (curDoc != docs[i]) {
            var curLayer;
            try { curLayer = docs[i].activeLayer; } catch (e) { }
            curDoc.activeLayer.duplicate(docs[i], ElementPlacement.PLACEATBEGINNING);
            app.activeDocument = docs[i];
            app.activeDocument.activeLayer.name = 'Processed Scan'; //This part renames the pasted image.
            if (curLayer) { docs[i].activeLayer.move(curLayer, ElementPlacement.PLACEBEFORE); }
        }
        app.activeDocument = curDoc;
    }
}