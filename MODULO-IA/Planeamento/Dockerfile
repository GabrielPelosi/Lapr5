FROM swipl


COPY . /app
 
ENTRYPOINT ["swipl"]
CMD ["/app/server_test.pl",  "--user=daemon", "--fork=false"]