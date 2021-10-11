import datetime
import inspect
import re
from pprint import pprint
from exchangelib import Account, CalendarItem, Credentials
from exchangelib.items import MeetingRequest, MeetingCancellation, \
    SEND_TO_ALL_AND_SAVE_COPY

# pass in later
def outlook_Cal(username, pword, startDate, endDate):
    credentials = Credentials(
        username=username,
        password=pword
    )
    a = Account(
        primary_smtp_address=username,
        credentials=credentials,
        autodiscover=True,
        # access_type=DELEGATE
    )



    start = datetime.datetime(2021, 9, 1, tzinfo=a.default_timezone)
    end = datetime.datetime(2021, 9, 30, tzinfo=a.default_timezone)

    # create a meeting request and send it out
    calendar_items = a.calendar.view(start=start, end=end).order_by('subject', 'categories')

    query_set = a.calendar.filter(start__range=(start, end))
    for item in query_set.order_by('-start'):
        print(item.subject)
        print(item.start)
        print(item.end)
        if item.required_attendees is not None:
            for k in item.required_attendees:
                print(k.mailbox.name)
        else:
            print('None')

        print()
