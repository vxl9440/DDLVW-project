import datetime
import inspect
import re
from pprint import pprint
from exchangelib import Account, CalendarItem, Credentials
from exchangelib.items import MeetingRequest, MeetingCancellation, \
    SEND_TO_ALL_AND_SAVE_COPY

start_string = 'start'
end_string = 'end'
required_string = 'required_attendees'
subject_string = 'subject'
cal_list3 = []

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
start = datetime.datetime(2021, 9, 1, tzinfo=a.default_timezone)
end = datetime.datetime(2021, 9, 30, tzinfo=a.default_timezone)

x = 0
cal_list = []
cal_list2 = []

# create a meeting request and send it out

calendar_items = a.calendar.view(start=start, end=end).order_by('subject', 'categories')
# print(calendar_items)
i = 0
test_list = []
last_line = ''
flag = False
final_list = []
for cal in calendar_items:
    split = str(cal).split(',')
    for k in split:
        k = k.strip(' ')
        if 'start=EWSDate' in k:
            flag = True
        if not flag:
            if start_string in k or end_string in k or required_string in k or subject_string in k:
                if not 'CalendarItem' in k and not 'is_resend' in k \
                        and not 'item' in k and not 'timezone' in k:
                    test_list.append(k)
                # print(k)
        if flag:
            if start_string in k or end_string in k or required_string in k or subject_string in k or k.isdigit():
                if not 'CalendarItem' in k and not 'is_resend' in k \
                        and not 'item' in k and not 'timezone' in k:
                    test_list.append(k)

    x = x + 1
# print(len(test_list))
# # print(i)
for k in test_list:
    if 'subject' in k:
        # print(k)
        print()
    elif 'ttendee' in k:
        student = k.split("'")
        if len(student) >= 2:
            # print(student[0])
            print(student[1])
            # print(student[2])
    # print()
year = ''
month = ''
day = ''
date = ''
hour = ''
flag2 = True
for k in test_list:
    if 'start=EWS' in k or 'end=EWS' in k and year == '' and month == '' and day == '':
        year = re.sub('[^0-9]', '', k)
    elif k.isdigit() and month == '':
        month = k
    elif k.isdigit() and day == '':
        day = k
        date = (year + '/' + month + '/' + day)
        # print(date)
    elif k.isdigit() and not year == '' and not month == '' and not day == '' and hour == '':
        if flag2:
            k = int(k)
            hour = k - 4
        if not flag2:
            k = int(k)
            hour = k - 4
    elif k.isdigit() and not year == '' and not month == '' and not day == '' and not hour == '':
        if flag2:
            minute = k
            meeting_start = ('The meeting starts at: ' + str(date) + ' ' + str(hour) + ':' + str(minute))

            year = ''
            month = ''
            day = ''
            date = ''
            hour = ''
            flag2 = False
        if not flag2:
            minute = k
            meeting_end = ('The meeting ends at: ' + str(date) + ' ' + str(hour) + ':' + str(minute))
# if 'The meeting ends at:  :0' in meeting_end:
#
# else:
if meeting_start.endswith('0'):
    print(meeting_start + '0')
if meeting_end.endswith('0'):
    print(meeting_end + '0')
else:
    print(meeting_end)
if meeting_end.endswith('0'):
    print(meeting_end + '0')
    if meeting_start.endswith('0'):
        print(meeting_start + '0')
    else:
        print(meeting_start)
else:
    print(meeting_start)
    print(meeting_end)

for cal in a.calendar.all():
    if x == 0:
        # print(type(cal))
        attributes = inspect.getmembers(CalendarItem, lambda a: not (inspect.isroutine(a)))
        cal_list = ([a for a in attributes if not (a[0].startswith('__') and a[0].endswith('__'))])
        for i in cal_list:
            if not '__' in str(i):
                cal_list2.append(i)

        cal = str(cal)
        # print(cal)
        cal = cal.strip('\n')
        # print(cal.split('\r'))
        # print(cal)
        x = x + 1
start_string = 'start'
end_string = 'end'
required_string = 'required_attendees'
subject_string = 'subject'
cal_list3 = []
for k in cal_list2:
    # print(str(k) + '\n')
    if start_string in k or end_string in k or required_string in k or subject_string in k:
        cal_list3.append(k)

for i in cal_list3:
    # print(str(i)+'\n')
    # print(cal_list)
    # cancel a meeting that was sent out using the CalendarItem class
    x = 0
# string_name = 'Dustin Rochette'
# for calendar_item in a.calendar.all():
#     sender = str(getattr(calendar_item, 'organizer'))
#     attendees = str(getattr(calendar_item, 'required_attendees'))
#     # print(attendees.name)
#     if string_name in sender:
#         # print(getattr(calendar_item, "organizer"))
#         splitter2 = sender.partition('email_address=')
#         splitter2 = str(splitter2[2])
#         splitter3 = splitter2.partition(', routing_type')
#         meeting_organizer = str(splitter3[0]).strip("'")
#         print(string_name, meeting_organizer)


# str_calendar_item = str(calendar_item)
#
# # pprint(dir(calendar_item))
# for element in str_calendar_item:
#     x=1

# print(str(calendar_item))
# pprint(dir(calendar_item))
# print(type(calendar_item))
