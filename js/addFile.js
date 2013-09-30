// This file for add file (Pic, Music, Video, or text);



(function () {
	
	//	add text file text file
	var addFile = document.querySelector("#device-storage");
	
	if(addFile){
	
		addFile.onclick = function (){
			var fileName = document.querySelector("[name*='fileName']").value;
			if(fileName && fileName.length > 3){
				var sdcard = navigator.getDeviceStorage("sdcard");
				var file   = new Blob(["This is a text file."], {type: "text/plain"});
				var requestToAddFile = sdcard.addNamed(file, fileName );
	
				requestToAddFile.onsuccess = function () {
					console.log('File "' + this.result + '" successfully wrote on the sdcard storage area');
				}
	
				// An error typically occur if a file with the same name already exist
				requestToAddFile.onerror = function () {
					console.warn('Unable to write the file: ' + this.error);
				}
			}else{
				console.warn('Please write file name longer than 3 char');
			}
			
		}; 
		
  	}
  	
})();
