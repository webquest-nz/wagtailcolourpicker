#!/usr/bin/env python

from setuptools import find_packages, setup

from codecs import open
from os import path
from wagtailcolourpicker import __version__


install_requires = [
    'wagtail>=4,<6'
]

documentation_extras = [
    'sphinxcontrib-spelling>=2.3.0',
    'Sphinx>=1.5.2',
    'sphinx-autobuild>=0.6.0',
    'karma_sphinx_theme>=0.0.6',
]

here = path.abspath(path.dirname(__file__))

with open(path.join(here, 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='wagtailcolourpicker',
    version=__version__,
    description='Wagtail text colour picker for DraftJS',
    long_description=long_description,
    long_description_content_type='text/x-rst',
    author='Stuart George',
    author_email='stuart@accentdesign.co.uk',
    url='https://github.com/AccentDesign/wagtailcolourpicker/',
    download_url='https://pypi.org/project/wagtailcolourpicker/',
    license='MIT',
    packages=find_packages(include=['wagtailcolourpicker', 'wagtailcolourpicker.*']),
    install_requires=install_requires,
    extras_require={
        'docs': documentation_extras
    },
    include_package_data=True,
    python_requires='>=3.8',
    keywords=['wagtail', 'draftjs', 'colour', 'picker', 'accent', 'design'],
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
        'Programming Language :: Python :: 3.12',
        'Framework :: Django',
        'Framework :: Django :: 4.2',
        'Framework :: Wagtail',
        'Framework :: Wagtail :: 4',
        'Framework :: Wagtail :: 5',
        'Topic :: Internet :: WWW/HTTP :: Site Management',
    ],
)
