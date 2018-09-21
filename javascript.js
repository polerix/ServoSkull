$(document).ready(function() {

function getQuote() {
  var quotes=[{
	quote: "A good soldier obeys without question. A good officer commands without doubt.", 
	name: "Imperium Thought for the Day"
  },{
	quote: "Blessed is the mind too small for doubt.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "To admit defeat is to blaspheme against the Emperor.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "For those who seek perfection there can be no rest on this side of the grave.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "The difference between heresy and treachery is ignorance.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Knowledge is power, guard it well.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "An open mind is like a fortress with its gates unbarred and unguarded.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Innocence proves nothing.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Success is commemorated; Failure merely remembered.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Even a man who has nothing can still offer his life.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Only in death does duty end.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "No man died in His service that died in vain.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Hope is the first step on the road to disappointment.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "There is no such thing as innocence, only degrees of guilt.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Beginning reform is beginning revolution.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Educate men without faith and you but make them clever devils.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Success is measured in blood; yours or your enemy´s.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "The man who has nothing can still have faith.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Burn the heretic. Kill the mutant. Purge the unclean.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "It is better to die for the Emperor than to live for yourself.", 
	name:  "Imperium Thought for the Day",
  },{

	quote: "Fear denies faith.", 	name:  "Imperium Thought for the Day",
  },{
	quote: "Foolish are those who fear nothing, yet claim to know everything.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Brave are they who know everything yet fear nothing.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Happiness is a delusion of the weak.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "All souls call out for salvation.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Life is the Emperor's currency, spend it well.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "A suspicious mind is a healthy mind.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Cowards die in shame.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Faith without deeds is worthless.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "True Happiness stems only from Duty.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "The blood of martyrs is the seed of the Imperium.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Heresy grows from idleness.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "There is only the Emperor, and he is our shield and protector.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Truth is Subjective.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Damnation is Eternal.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Know the Mutant; Kill the Mutant.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "To Question is to doubt.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "He who keeps silent consents.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Prayer cleanses the soul, Pain cleanses the body.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Death by thy Compass.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Zeal is its own Excuse.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Work earns Salvation.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Without him there is nothing.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Only the Emperor is all.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "Hatred is the emperor's greatest gift to humanity.",
	name:  "Imperium Thought for the Day",
  },{
	quote: "Victory needs no explanation, defeat allows none.", 
	name:  "Imperium Thought for the Day",
  },{
	quote: "A small mind is easily filled with faith.", 
	name:  "Imperium Thought for the Day",
},];

    var quote = $('#quoteContainer').text();
    var quoteName = $('#quoteName').text();
    var sourceLength = quotes.length;
    var randomNumber = Math.floor(Math.random() * sourceLength);

    for (i = 0; i <= sourceLength; i += 1) {
      var newQuoteText = quotes[randomNumber].quote;
      var newQuoteName = quotes[randomNumber].name;
    }
    
    var timeAnimation = 500;
    var quoteContainer = $('#quoteContainer');
      quoteContainer.fadeOut(timeAnimation, function() {
        quoteContainer.html('');
        quoteContainer.append('<p>' + newQuoteText + '</p>' + '<p id="quoteName">' + '-	' + newQuoteName + '</p>');
        quoteContainer.fadeIn(timeAnimation);
      }); //end of fadeOut
    } //end of getQuote
getQuote();
  
$('#quoteButton').click(getQuote);

}); //end of document.ready