	    function Charachter(charachterId) {    
                     this.Id = charachterId; 
		             this.CssClassName = "." + this.Id;     		     		                            
		};

        Charachter.prototype.Init = function(){

		    if (this.Id == 'alien1')
		    {
		     	    this.AnimateAlien();
		    }
		    else
		    {
			    this.AnimateHero();
		    }

			//$(this.CssClassName).animateSprite('stop');				
				 				
		}

		 Charachter.prototype.AnimateHero = function(){
			$(this.CssClassName).animateSprite({
	    				fps: 4,
	    				animations: {
	        			walkingLeft: [0,1,2],
	        			walkingRight: [3,4,5]
	    			    },
	    			    loop: true,
	    			    complete: function(){   					                       
	        		    // use complete only when you set animations with 'loop: false'
	        		    //alert("animation End");
	                                                                
	                            }
			         });
		     }

		     Charachter.prototype.AnimateAlien = function(){		     
			$(this.CssClassName).animateSprite({
	    				fps: 3,
	    				animations: {
	        			waiting: [0,1,2]	        			
	    			    },
	    			    loop: true,
	    			    complete: function(){                            
	        		    // use complete only when you set animations with 'loop: false'
	        		    //alert("animation End");
	                                                                
	                            }
			         });
		     }
			
  		     Charachter.prototype.Show = function(x_pos, y_pos){							
				var d = document.getElementById(this.Id);				
	  			d.style.position = "absolute";
	  			d.style.left = x_pos+'px';
	  			d.style.top = y_pos+'px';								
		     }

		      Charachter.prototype.AlienDisappear = async function()
		     {	 
 			     await sleep(1000); 			
			     $(this.CssClassName).animateSprite('stop');			 
			     await sleep(1000);
			  
			     //$("#" + this.Id).css('background-image', 'url(img/fairyTeethMicro.png)');
			     //$("#" + this.Id).css('background-repeat', 'no-repeat');  
			
			     // 
			 				
			     //var duration = 9000;

			     //$("#" + this.Id).animate({ 
				 //   left: "-=1000px",
				 //   top:"-=1000px"
				 //   }, duration, "linear" );

			     //await sleep(4000);

			     //man1.HumanDisappear();								  
		      }

		      Charachter.prototype.HumanDisappear = function()
		      {
			      $("#" + this.Id).animate({ 
				    left: "-=1000px",
				    top:"-=1000px"
				    }, 8000, "linear" );
		      }

		      Charachter.prototype.AlienCalculating = function()
		      {
			  $(this.CssClassName).animateSprite('play', 'waiting');
		      }

		      Charachter.prototype.StopAnimation = function()
		      { 				
				$(this.CssClassName).animateSprite('stop');
		      }

		      Charachter.prototype.GoAwayOnFinishing = function()
		      { 				
				$(this.CssClassName).animateSprite('play', 'walkingRight');
				
				var duration = 5000;

				$("#" + this.Id).animate({ 
        				left: "+=1000px",
      				}, duration, "linear" );
		      }
		      
		      var DefaultMessageBackColor = '#666';
		      var ErrorMessageBackColor = '#E72508';	      

		      Charachter.prototype.MessageFromAlien = function(message)
		      {				
				$(this.CssClassName).showBalloon({                  		  
									  tipSize: 24,
									  css: {
									    border: 'solid 4px #F8F8FF',
									    padding: '10px',
									    fontSize: '150%',
									    fontWeight: 'bold',
									    lineHeight: '3',
									    backgroundColor: '#666',
									    color: '#fff'
									  }, 
							                  contents: message,
							                  showDuration: 1000, hideDuration: 500
									});				
				
		       }

			Charachter.prototype.AngryMessageFromAlien = function(message)
		      {
				$(this.CssClassName).showBalloon({                  		  
									  tipSize: 24,
									  css: {
									    border: 'solid 4px #F8F8FF',
									    padding: '10px',
									    fontSize: '150%',
									    fontWeight: 'bold',
									    lineHeight: '3',
									    backgroundColor: ErrorMessageBackColor,
									    color: '#fff'
									  }, 
							                  contents: message,
							                  showDuration: 0, hideDuration: 500
									});
		       }
			
		       Charachter.prototype.AnswerFromHuman = function()			
		       {
				$('.hero1').showBalloon({                  		  
					  html: true,
					  css: {
					    border: 'solid 4px #F8F8FF',
					    padding: '10px',
					    fontSize: '150%',
					    fontWeight: 'bold',
					    lineHeight: '3',
					    backgroundColor: '#666',
					    color: '#fff'
					  }, 
			                  contents: '<input type="text" size="40" id="answerTB">'
			    +'<input type="button" onclick="CheckAnswer();" value="Answer">',
			                  showDuration: 1000, hideDuration: 500
					});		
		       }

			Charachter.prototype.HideMessage = function()
			{
				$(this.CssClassName).hideBalloon();
			}			

			Charachter.prototype.HumanComeToScene = function(horizontalShift)
		    { 
		        var duration = 5000;
		      
			    $("#" + this.Id).animate({ 
			        left: "-=" + horizontalShift + "px",
      			    }, duration, "linear", function() {    						
					    //$( this.CssClassName ).animateSprite('stop');
						
					    StartGame();
  				    });
		    }
					

			//**********************************Game logic******************************************
			var actualCorrectAnswer;
			
			var mistakes = 0;
			var corresctAnswCount = 0;
			
			var actualSample;
			var errorsLimit = 2;
			var correctAnswersLimit = 1;			

		    async function StartGame()
		    {
		        man1.StopAnimation();
			    alien1.StopAnimation();
			    alien1.MessageFromAlien(GenerateQuestion(), DefaultMessageBackColor);
			    await sleep(2000);
			    man1.AnswerFromHuman();	
			    window.scroll(500, 200);			  			
		    }
			
			async function CheckAnswer()
			{					
				if (answerTB.value == actualCorrectAnswer)
				{		
					corresctAnswCount++;								
					man1.HideMessage();
					alien1.HideMessage();

					if(corresctAnswCount >= correctAnswersLimit)
					{
					    Win();
					}
					else 
					{
					//alien1.MessageFromAlien('!!!!');
					//alien1.HideMessage();
						await sleep(2000);
						alien1.AlienCalculating();
						alien1.MessageFromAlien(GenerateQuestion());
					//await sleep(2000);
						man1.AnswerFromHuman();
					}
				}
				else 
				{				
					mistakes++;
					man1.HideMessage();
					alien1.HideMessage();
					
					if (mistakes >= errorsLimit)
					{
						man1.GoAwayOnFinishing();				
					}					
					else
					{					
						await sleep(2000);
						alien1.StopAnimation();
						alien1.AngryMessageFromAlien(actualSample);					
						man1.AnswerFromHuman();
					}
				}
			}

			function GenerateQuestion()
			{
			    var firstNumber = Math.floor(Math.random() * 6) + 1;
                            var secondNumber = Math.floor(Math.random() * 6) + 1;
			    actualCorrectAnswer = firstNumber * secondNumber;
			   
			    actualSample = firstNumber + " * " + secondNumber + " =";
			    return actualSample;
			}

			function Win()
			{
				//alien1.AlienDisappear();
			}

			//*************************Helpers********************************************************

			function sleep(ms) {
				  return new Promise(resolve => setTimeout(resolve, ms));
			}


		      
		       
