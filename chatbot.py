import re

# List of dynamic patterns
patterns = {
    r'(hello|hi|hey)': "Hello! How can I assist you today?",
    r'(help|support)': "I'm here to help! You can ask me about services, ticket booking, and more.",
    r'(book.*ticket)': "Sure! You can book your ticket via our online booking system.",
    r'(bye|goodbye)': "Goodbye! Have a great day.",
    r'(services|service)': "We offer: Ticket Booking | Ticekt Cancellation | Museum View",
    r'(pricing|price)': "We costs Rs 100 per ticekt",
    r'(timing|time)': "We provide services 24x7",
    r'(policies|guidelines)': '''1. Person below age of 18 not allowed to book ticket.
                                 2. Ticekts can be cancelled within 48hrs of booking.
                                 3. Same person cannot book multiple tickets.
                                 4. Refund will be not allowed if you are unable to visit museum.'''
}

def get_chatbot_response(user_message):
    user_message = user_message.lower()

    for pattern, response in patterns.items():
        if re.search(pattern, user_message):
            return response

    return "I'm sorry, I don't understand that. Could you please clarify?"

