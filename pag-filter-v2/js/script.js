//showpage function that displays a list of ten students based on "page number" user has selected//
function showPage(page, list) {
    // hide all students on the page
    list.hide();

    //beginning and ending position of page
    var start = (page*10)-10;
    var end = start + 10;
    // Then loop through all students in student list argument
    for (var i = 0; i < list.length; i++) {
        // if student should be on this page
        if (i < page*10 && i >= (page*10)-10) {
            //show student
            list.slice(start, end).show();
        };
    };
}

//appendpagelinks this creates links to different pages or lists of students//
function appendPageLinks(list) {
    // determine how many pages for this student list 
    var pages = Math.ceil(list.length/10);
    // create a page link section unobtrusively
    var link = '<div class="pagination"><ul>';
    var pageArr = [];
    // “for” every page
    for (var i = 1; i <= pages; i++) {
        // add a page link to the page link section
        link += '<li><a href="#">' + i + '</a></li>';
        pageArr.push(i);
    };
    link+='</ul></div>';

    // remove the old page link section from the site
    //$('.pagination ul li').remove();
    // append our new page link section to the site
    $('.page').append(link);
    // define what happens when you click a link
    $('.pagination ul li').click(function() {
        // Use the showPage function to display the page for the link clicked
        showPage($(this).text(),list);
        // mark that link as “active”
        $('.pagination ul li').removeClass('active');
        $(this).addClass('active');
    });     
}

//add search unobtrusively
var link = '<div class="student-search"><input placeholder="Search for students...">';
link+= '<button id="button">Search</button></div>';
$('.page-header').append(link);

function searchList() {
    // Obtain the value of the search input
    var result = $('input').val();
    
    // remove the previous page link section
    $('.pagination ul li').remove();

    //store matched results
    var matched = [];
    // Loop over the student list, and for each student…
    $('.student-item').each(function(student) {
        // ...obtain the student’s name…
        var name = $(this).children('div').find('h3').text();
        // ...and the student’s email…
        var email = $(this).children('div').find('span').text();

        //hide all items
        $(this).hide();
        // ...if the search value is found inside either email or name…
        if (name.includes(result) || email.includes(result)) {
            // ...add this student to list of “matched” student
            matched.push($(this));
            console.log(matched);

            //show the items that match results
            $(this).show();
        } else {
            // remove items that aren't matched
            $(this).remove();
        }
    });

    // If there’s no “matched” students…
    if (matched.length === 0) {
        // ...display a “no student’s found” message
            alert("No student's found");
        }      
    // If over ten students were found…
    if (matched.length > 10) {
        appendPageLinks($('.student-item'));
        //call showPage function on the existing list of matched results
        showPage(Math.ceil(matched.length/10), $('.student-item'));
        //default to the first page
        showPage(1, $('.student-item'));
    };
}

showPage(1, $('.student-item'));
appendPageLinks($('.student-item'));
$('button').click(function() {
    searchList();
});

