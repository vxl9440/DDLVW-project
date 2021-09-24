import datetime
from pprint import pprint
from exchangelib import Account, CalendarItem, Credentials
from exchangelib.items import MeetingRequest, MeetingCancellation, \
  SEND_TO_ALL_AND_SAVE_COPY

credentials = Credentials(
    username='iSchoolCheckIn@rit.edu',
    password='Iste501SeniorDev'
)
a = Account(
    primary_smtp_address='iSchoolCheckIn@rit.edu',
    credentials=credentials,
    autodiscover=True,
    # access_type=DELEGATE
)
start = datetime.datetime(2017, 1, 1, tzinfo=a.default_timezone)
end = datetime.datetime(2018, 1, 1, tzinfo=a.default_timezone)


# create a meeting request and send it out

calendar_items = a.calendar.view(start=start, end=end).order_by('subject', 'categories')
# print(calendar_items)
# for cal in a.calendar.all():
    # print(cal.view(start=start, end=end).order_by('subject', 'categories'))
# cancel a meeting that was sent out using the CalendarItem class
x = 0
string_name = 'Dustin Rochette'
for calendar_item in a.calendar.all():
    sender = str(getattr(calendar_item, 'organizer'))
    attendees = str(getattr(calendar_item, 'required_attendees'))
    # print(attendees.name)
    if string_name in sender:
        # print(getattr(calendar_item, "organizer"))
        splitter2 = sender.partition('email_address=')
        splitter2 = str(splitter2[2])
        splitter3 = splitter2.partition(', routing_type')
        meeting_organizer = str(splitter3[0]).strip("'")
        print(string_name, meeting_organizer)



    str_calendar_item = str(calendar_item)

    # pprint(dir(calendar_item))
    for element in str_calendar_item:
        x=1

    # print(str(calendar_item))
# pprint(dir(calendar_item))
# print(type(calendar_item))