import os
import ast
from softtek_llm.chatbot import Chatbot
from softtek_llm.models import OpenAI
from dotenv import load_dotenv
from pdf_reader import getPDFText

def get_info_user():
    load_dotenv()
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    if OPENAI_API_KEY is None:
        raise ValueError("OPENAI_API_KEY not found in .env file")

    OPENAI_API_BASE = os.getenv("OPENAI_API_BASE")
    if OPENAI_API_BASE is None:
        raise ValueError("OPENAI_API_BASE not found in .env file")

    OPENAI_CHAT_MODEL_NAME = os.getenv("OPENAI_CHAT_MODEL_NAME")

    if OPENAI_CHAT_MODEL_NAME is None:
        raise ValueError("OPENAI_CHAT_MODEL_NAME not found in .env file")

    model = OpenAI(
        api_key=OPENAI_API_KEY,
        model_name=OPENAI_CHAT_MODEL_NAME,
        api_type="azure",
        api_base=OPENAI_API_BASE,
        verbose=True,
    )
    chatbot = Chatbot(
        model=model,
        description="You are a very helpful and polite chatbot",
        verbose=True,
    )


    ## PROMPT

    # text = getPDFText(url)

    text = """José Eduardo de Valle Lara
    SoftwareEngineer
    Personal Data
    Cityofresidence: Monterrey-MTY, México
    Telephone: +52 99 3303 2438
    Email: jsvalle50@gmail.com
    GitHub: https://github.com/EduardodeValle
    Education
    2020 - 2025 InstitutoTecnológicoydeEstudiosSuperioresdeMonterrey
    B.S.inComputerScienceandTechnology
    Tech Stack
    Python C++ Matlab NodeJS React
    MySQL R Swift Git Linux
    Experience
    Aug2023-Present ComitéEcológicoIntegraldelestadodeNuevoLeón-DataAnalyst
    Analysis and cleaning of data with Python (Pandas, NumPy, Matplotlib) about the air
    quality of the state of Nuevo León.
    • I developed pipelines to read raw data with an API, manipulate it and make deriva-
    tions and then save it to a database.
    • I adjusted the raw data obtained from sensors to optimize the calculation of pollu-
    tion models such as US EPA.
    Aug2023-Oct2023 Diloenseñas-Señaventuras
    I participate in the development of a mobile application for iOS that helps people with
    hearingdisabilitiestolearnMexicanSignLanguagewithgamification,SwiftUIisthemain
    framework, Core ML is used for artificial intelligence for object detection between other
    features.
    • Developed augmented reality animations with Reality Composer and added them
    to the main menu of the application with Reality Kit, established communication
    between the augmented reality views and SwiftUI.
    Dic2022-present TecnológicodeMonterrey-TopologicalDataAnalysis
    I collaborate on a topology research project that focuses on the evolution of SARS-CoV-2
    in the state of Nuevo León.
    • Performed extensive data cleaning, manipulation and tuning using Python (Pandas,
    NumPy, Matplotlib).
    • I built graphs from the data with the KeplerMapper library and exported them to
    html files to visualize them, I transformed the structure of the graphs to a cus-
    tomized one to apply algorithms such as MergeSort, binary search, Dijkstra and BFS
    to obtain the topological properties of each graph.
    Feb2023-May2023 TecnológicodeMonterrey-Studentsystem
    Iworkedonaprojectthatisacloneoftheanonymoussurveysystemthatstudentsanswer
    to rate the content of a subject and the quality of the teachers.
    • IdesignedthedatabasewithMySQLthatstoresallusersbyroles,completedsurveys
    and pending surveys.
    • Web development of the administrator page to enable and create new surveys, I
    focusedonthebackendwithNodeJS,React(contexts),Expressandmoreframeworks."""

    print("BEGINNING")

    response = chatbot.chat(
        "The following text represents a resume of an applicant, just return a read confirmation text. This is the resume: " + text
    )
    confirmation = response.message.content


    response = chatbot.chat(
        "Return a python style list of personal information of the applicant, strictly and only with the format: [Full name, residence, telephone, email, other contact links...]. Do not return a message, strictly only return the array"
    )
    personal_info = response.message.content

    response = chatbot.chat(
        "Return a python style list with all the soft skills, and without any technical skill found in the text given, strictly and only with the format: [skill 1, skill 2, skill 3, ...]. Do not return a message, strictly only return the array"
    )
    soft_skills = response.message.content

    response = chatbot.chat(
        "Return a python style list with all the technical skills found in the text given, strictly and only with the format: [skill 1, skill 2, skill 3, ...]. Do not return a message, strictly only return the array"
    )
    technical_skills = response.message.content

    # response = chatbot.chat(
    #     "Return a python style list with all the main projects found in the text given, strictly and only with the format: [[title 1, description], [title 2, description], [title 3, description], ...]. Do not return a message, strictly only return the array"
    # )
    # res_5 = response.message.content

    response = chatbot.chat(
        "Return the time periods, including month and year, when the main projects where done. If not specified return an empty python array. Do not return a message, strictly only return the array"
    )
    periods = response.message.content

    response = chatbot.chat(
        "Calculate and return just number the months passed in every time period in the next list: " +  periods + ". Do not return a message, strictly only return the array"
    )
    number_time_periods = response.message.content



    print("\n\n============================= AI RESPONSE =============================\n\n")
    print(confirmation  + "\n\n" + personal_info + "\n\n" + soft_skills + "\n\n" + technical_skills + "\n\n" + number_time_periods)
    # print(type(response))

    print("\n\n============================= Parsed DATA =============================\n\n")

    # Convert the string to a Python list
    personal_info_arr = ast.literal_eval(personal_info)
    soft_skills_arr = ast.literal_eval(soft_skills)
    technical_skills_arr = ast.literal_eval(technical_skills)
    number_time_periods_arr = ast.literal_eval(number_time_periods)

    print(personal_info_arr) 
    print(soft_skills_arr) 
    print(technical_skills_arr) 
    print(number_time_periods_arr)



    