// JAVA-SCRIPT:
const add_box = document.querySelector(".add-box");
const pop_up_title = document.querySelector(".content header p");
const pop_up_box = document.querySelector(".pop-up-box");
const close_pop_box = document.getElementById("close_pop_box");

const title = document.getElementById("title-input");
const description = document.getElementById("description-input");
const add_note_button = document.getElementById("add-note-button");

const months = ["January", "Febuary", "March", "April", "May", "June", "July", "Augest", "September", "Octobor", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let update = false, update_id;

// POP-UP-BOX
add_box.addEventListener("click", () =>
{
    pop_up_box.style.display = "block";
});

// CLOSE-POP-UP-BOX
close_pop_box.addEventListener("click", () =>
{
    title.value = ""
    description.value = "";

    pop_up_title.innerHTML = "Add, New Note !";
    add_note_button.innerHTML = "Add Note";

    update = false;

    pop_up_box.style.display = "none";
});

// CLOSE-POP-UP-BOX
window.addEventListener("click", (event) =>
{
    if(event.target == pop_up_box)
    {
        title.value = ""
        description.value = "";

        pop_up_title.innerHTML = "Add, New Note !";
        add_note_button.innerHTML = "Add Note";

        update = false;

        pop_up_box.style.display = "none";
    }
});

// ADD-NOTE
add_note_button.addEventListener("click", () =>
{
    let title_input = title.value;
    let description_input = description.value;

    if(title_input == "" || description_input == "")
    {
        console.log("Plz, type any task...")
    }
    else
    {
        let current_date = new Date();
        let month = months[current_date.getMonth()];
        let date = current_date.getDate();
        let year = current_date.getFullYear();

        let note_info = 
        {
            title_text : title_input, 
            description_text : description_input,
            date_text : `${month} ${date}, ${year}`
        }

        // ADD-NEW-NOTES
        if(!update)
        {
            notes.push(note_info);
        }
        else
        {
            update = false;
            notes[update_id] = note_info;
        }

        // STORE-NOTES
        localStorage.setItem("notes", JSON.stringify(notes));

        // ERASE-DATA
        title.value = "";
        description.value = "";

        // CLOSE-POP-UP-BOX
        close_pop_box.click();

        // SHOW-NOTE-FUNCTION
        show_notes();
    }
});

// SHOW-NOTE'S (FUNCTION):
function show_notes()
{
    document.querySelectorAll(".notes").forEach(note => note.remove());
    notes.forEach((note, index) =>
    {
        let note_list_tag = 
        `<li class="notes">
            <div class="details">
                <p>${note.title_text}</p>
                <span>${note.description_text}</span>
            </div>

            <div class="bottom-content">
                <span>${note.date_text}</span>
                <div class="setting">
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    <ul class="menu">
                        <li onclick="edit_note(${index}, '${note.title_text}', '${note.description_text}')">
                            <i class="fas fa-pen"></i>
                            <p>Edit</p>
                        </li>

                        <li onclick="delete_note(${index})">
                            <i class="fas fa-trash"></i>
                            <p>Delete</p>
                        </li>
                    </ul>
                </div>
            </div>
        </li>`;
        add_box.insertAdjacentHTML("afterend", note_list_tag);
    });
}

// SHOW-NOTE
show_notes();

// EDIT-NOTE (FUNCTION):
function edit_note(note_id, title_input_text, description_input_text)
{
    add_box.click();

    update = true;
    update_id = note_id;

    title.value = title_input_text;
    description.value = description_input_text;

    pop_up_title.innerHTML = "Update, Note !";
    add_note_button.innerHTML = "Update Note";

    // SHOW-NOTE
    show_notes();
}

// DELETE-NOTE (FUNCTION):
function delete_note(note_id)
{
    // REMOVE-NOTE
    notes.splice(note_id, 1);

    // STORE-NOTES
    localStorage.setItem("notes", JSON.stringify(notes));

    // SHOW-NOTE
    show_notes();
}