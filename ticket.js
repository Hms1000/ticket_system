// ticket class
class Ticket {
    constructor(
        ticketID,
        studentName,
        issueDescription,
        category,
        priority = "Low",
        status = "In Progress"
    ) {
        this.ticketID = ticketID;
        this.studentName = studentName;
        this.issueDescription = issueDescription;
        this.category = category;
        this.priority = priority;
        this.status = status;
    }

    // displaying a ticket
    display() {
        console.log(`Ticket ID: ${this.ticketID}`);
        console.log(`Student Name: ${this.studentName}`);
        console.log(`Issue Description: ${this.issueDescription}`);
        console.log(`Category: ${this.category}`);
        console.log(`Priority: ${this.priority}`);
        console.log(`Status: ${this.status}`);
    }
}

class TicketSystem {
    constructor() {
        this.tickets = [];
        this.waitingTicketQueue = [];
        this.recentlyResolvedTicketStack = [];
    }

    // add a new ticket to the ticket system
    addTicket(ticket) {
        return this.tickets.push(ticket);
    }

    // first in first out queue 
    fifoQueue(ticket) {
        // display the next ticket waiting to be processed
        console.log(`Next ticket to be processed: ${this.tickets[0]}`);
        return this.tickets.shift(ticket);
    }
    
    // adding processed ticket to a stack
    addProcessedTicket(ticket) {
        if (ticket.status === "Resolved") {
            console.log(`Ticket ${ticket.ticketID} has been resolved and added to the stack.`);
            return this.recentlyResolvedTicketStack.push(ticket);
        } else {
            console.log(`Ticket ${ticket.ticketID} is not resolved yet.`); 
        }
    }
    
    // pop the last processed ticket
    popProcessedTicket() {
        return this.recentlyResolvedTicketStack.pop();

    }

    // display all recorded tickets
    displayAllTickets() {
        this.tickets.forEach(ticket => {
            ticket.display();
        });
    }

    // update the status of an existing ticket
    updateTicketStatus(ticketID, newStatus) {
        const ticketIndex = this.tickets.findIndex(ticket => ticket.ticketID === ticketID);
        if (ticketIndex !== -1) {
            this.tickets[ticketIndex].status = newStatus;
        }
    }

    //summary counts of tickets
    summaryCounts() {
        const ticketCounts = {};
        this.tickets.forEach(ticket => {
            if (ticketCounts[ticket.status]) {
                ticketCounts[ticket.status]++;
            } else {
                ticketCounts[ticket.status] = 1;
            }
        });
        return ticketCounts;
    }
}

const tickets = [
    new Ticket(1, "John Doe", "My computer doesn't boot", "Hardware"),
    new Ticket(2, "Jane Smith", "My printer doesn't print", "Hardware"),
    new Ticket(3, "Bob Johnson", "I can't log in", "Software"),
]
 
const system = new TicketSystem();

tickets.forEach(ticket => {
    system.addTicket(ticket);
});

system.displayAllTickets();
system.updateTicketStatus(1, "Resolved");
system.summaryCounts();
console.log(system.summaryCounts());

system.addProcessedTicket(system.addProcessedTicket());
