//list all the file on sdcard;

(function () {
	
	
	//var listFiles = document.querySelector("#list-files");
	var listFiles_display = document.querySelector("#tableListFile");
	
	if( listFiles_display){
		

		var sdcard = navigator.getDeviceStorage("sdcard");
			var cursor = sdcard.enumerate();
			var i = 1; // row start from 1;
			cursor.onsuccess = function () {
				
			
			  var searchFile = this.result;
			 // console.log("File found: " + searchFile.name);
			if(searchFile){
				var row = listFiles_display.insertRow(i++);
				row.insertCell(0).innerHTML= (i - 1) ;
				row.insertCell(1).innerHTML= searchFile.name;
				row.insertCell(2).innerHTML= "NA";
				row.insertCell(3).innerHTML= "NA";
				
			}
			  // Once we found a file we check if there is other results
			  if (!this.done) {
				// Then we move to the next result, which call the cursor
				// success with the next file as result.
				this.continue();
			  }
			}
		
		cursor.onerror = function () {
		console.warn("File found: " + this.error);
		}
		
		
		
	}
	
	// Edit button
	
	var editFile = document.querySelector(".edit");
	
	//console.log(listFiles_display.rows.length);
	if(editFile && listFiles_display ){
		var deleteButton = 1; // to show and hide the delete button
		
		var request2
		var button= new Array();
			button[0] = 0; // unused
		
			
		
				editFile.onclick = function (){
			if(deleteButton == 1){
			
				for(i = 1; i < listFiles_display.rows.length; i++){
					button[i ] = document.createElement("BUTTON");
					button[i ].id = i ;
					listFiles_display.rows[i].insertCell(4).appendChild(button[i]);
					
					button[i].onclick = function(){
						var rowIndex = this.parentNode.parentNode.rowIndex;
						
						var name = listFiles_display.rows[rowIndex].cells[1].textContent;
						//name = String(name).concat(".txt");
						name = String(name)
						request2 = navigator.getDeviceStorage('sdcard').delete(name);
						console.log(name);
						request2.onsuccess = function () {
							listFiles_display.deleteRow(rowIndex);
							console.log("File deleted" );
						}

						request2.onerror = function () {
						  	console.log("Unable to delete the file: " + this.error);
						}
						
							
					}
				}
				
				deleteButton = 0;
			}else{
				
				for(i = 1; i < listFiles_display.rows.length; i++){
					
					listFiles_display.rows[i].deleteCell(4);
			
					}
				deleteButton = 1;
			}
				
			
		}	
			
				
					
					
				
			
	}
	
	
	
	
	
		
})();